from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from passlib.context import CryptContext
import uuid
import json
from datetime import datetime
from supabase import create_client, Client

# -------------------- Supabase Setup --------------------
SUPABASE_URL = "https://ywqkhxyrzytryvlcdtmt.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWtoeHlyenl0cnl2bGNkdG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMjU4NzgsImV4cCI6MjA4MjYwMTg3OH0.3yaxmrt7Ui0mVUKyrbOqsZIgo5lJcodtSjY8XsUAa5A"  # replace with your anon/public key
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -------------------- App Setup --------------------
app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Schemas --------------------
class AuthData(BaseModel):
    username: str
    password: str


class CartItem(BaseModel):
    user_id: str
    product_id: int
    quantity: int = Field(gt=0)


class CartUpdate(BaseModel):
    quantity: int = Field(gt=0)


class CheckoutData(BaseModel):
    user_id: str

# -------------------- Helpers --------------------
def ensure_user_exists(user_id: str):
    user = supabase.table("users").select("*").eq("id", user_id).execute()
    if not user.data:
        raise HTTPException(status_code=404, detail="User not found")
    return user.data[0]


def ensure_product_exists(product_id: int):
    product = supabase.table("Products").select("*").eq("id", product_id).execute()
    if not product.data:
        raise HTTPException(status_code=404, detail="Product not found")
    return product.data[0]

# -------------------- Auth --------------------
@app.post("/signup")
def signup(data: AuthData):
    existing = supabase.table("users").select("*").eq("username", data.username).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Username already exists")

    user_id = str(uuid.uuid4())
    supabase.table("users").insert({
        "id": user_id,
        "username": data.username,
        "email": f"{data.username}@example.com",
        "password_hash": pwd_context.hash(data.password)
    }).execute()

    return {"user_id": user_id, "message": "User created"}


@app.post("/login")
def login(data: AuthData):
    user = supabase.table("users").select("*").eq("username", data.username).execute()
    if not user.data or not pwd_context.verify(data.password, user.data[0]["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"user_id": user.data[0]["id"], "message": "Login successful"}

# -------------------- Cart --------------------
@app.post("/cart/add")
def add_to_cart(item: CartItem):
    ensure_user_exists(item.user_id)
    ensure_product_exists(item.product_id)

    existing = supabase.table("cart")\
        .select("*")\
        .eq("user_id", item.user_id)\
        .eq("product_id", item.product_id)\
        .execute()

    if existing.data:
        supabase.table("cart").update({
            "quantity": existing.data[0]["quantity"] + item.quantity
        }).eq("id", existing.data[0]["id"]).execute()
    else:
        supabase.table("cart").insert({
            "user_id": item.user_id,
            "product_id": item.product_id,
            "quantity": item.quantity
        }).execute()

    return {"message": "Item added to cart"}


@app.patch("/cart/{cart_id}")
def update_cart_item(cart_id: int, data: CartUpdate):
    result = supabase.table("cart").update({
        "quantity": data.quantity
    }).eq("id", cart_id).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Cart item not found")

    return {"message": "Cart item updated"}


@app.delete("/cart/{cart_id}")
def remove_cart_item(cart_id: int):
    result = supabase.table("cart").delete().eq("id", cart_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return {"message": "Cart item removed"}


@app.delete("/cart/clear/{user_id}")
def clear_cart(user_id: str):
    ensure_user_exists(user_id)
    supabase.table("cart").delete().eq("user_id", user_id).execute()
    return {"message": "Cart cleared"}


@app.get("/cart/{user_id}")
def get_cart(user_id: str):
    ensure_user_exists(user_id)
    rows = supabase.table("cart")\
        .select("id, quantity, product_id, Products (product_name, price, image_path)")\
        .eq("user_id", user_id).execute()

    cart_items = []
    for r in rows.data:
        cart_items.append({
            "cart_id": r["id"],
            "product_id": r["product_id"],
            "product_name": r["Products"]["product_name"],
            "price": float(r["Products"]["price"]),
            "quantity": r["quantity"],
            "image_path": r["Products"]["image_path"]
        })

    return {"cart": cart_items}


# -------------------- Orders --------------------
@app.post("/checkout")
def checkout(data: CheckoutData):
    ensure_user_exists(data.user_id)

    cart_items = supabase.table("cart")\
        .select("product_id, quantity, Products (product_name, price)")\
        .eq("user_id", data.user_id).execute()

    if not cart_items.data:
        raise HTTPException(status_code=400, detail="Cart is empty")

    order_items = []
    total_price = 0
    for item in cart_items.data:
        order_items.append({
            "product_id": item["product_id"],
            "name": item["Products"]["product_name"],
            "price": float(item["Products"]["price"]),
            "quantity": item["quantity"]
        })
        total_price += float(item["Products"]["price"]) * item["quantity"]

    supabase.table("orders").insert({
        "user_id": data.user_id,
        "order_data": json.dumps(order_items),
        "total_price": total_price,
        "created_at": datetime.utcnow().isoformat()
    }).execute()

    supabase.table("cart").delete().eq("user_id", data.user_id).execute()

    return {"message": "Order placed", "total": total_price}


@app.get("/orders/{user_id}")
def get_orders(user_id: str):
    ensure_user_exists(user_id)

    orders = supabase.table("orders").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()

    return {
        "orders": [
            {
                "order_id": o["id"],
                "total_price": float(o["total_price"]),
                "items": json.loads(o["order_data"]),
                "created_at": o["created_at"]
            } for o in orders.data
        ]
    }
