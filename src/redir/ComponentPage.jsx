import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import SubHeaderNav from "../redir/SubHeaderNav";

/* 🔹 Filter configuration (UI label → DB value) */
const FILTER_CONFIG = {
  cpu: {
    title: "Brand",
    column: "brand",
    options: [
      { label: "Intel", value: "intel" },
      { label: "Ryzen", value: "amd" }, // Ryzen = AMD
    ],
  },
  gpu: {
    title: "Brand",
    column: "brand",
    options: [
      { label: "NVIDIA", value: "nvidia" },
      { label: "AMD", value: "amd" },
    ],
  },
};

export default function ComponentPage() {
  const { component } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const headerHeight = 64;
  const footerHeight = 64;

  /* Fetch products */
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("category", component)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } else {
        setProducts(data);
        setCurrentPage(1);
        setActiveFilters([]); // reset filters on category change
      }

      setLoading(false);
    }

    if (component) fetchProducts();
  }, [component]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (products.length === 0)
    return <p className="text-white text-center">No products found.</p>;

  /* 🔹 Filtering (exact match, DB-safe) */
  const filterConfig = FILTER_CONFIG[component];

  const filteredProducts = filterConfig
    ? products.filter((p) =>
        activeFilters.length === 0
          ? true
          : activeFilters.includes(p[filterConfig.column])
      )
    : products;

  /* Pagination calculations */
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const toggleFilter = (value) => {
    setCurrentPage(1);
    setActiveFilters((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <SubHeaderNav />

      <div
        className="flex"
        style={{ minHeight: `calc(100vh - ${headerHeight + footerHeight}px)` }}
      >
        {/* 🔹 Sidebar (CPU / GPU only) */}
        {filterConfig && (
          <div
            className="bg-gray-950 border-r border-gray-800 flex flex-col p-5"
            style={{
              width: "288px",
              position: "sticky",
              top: `${headerHeight}px`,
              height: `calc(100vh - ${headerHeight + footerHeight}px)`,
            }}
          >
            <h3 className="text-sm font-semibold text-gray-200 mb-3">
              {filterConfig.title}
            </h3>

            {filterConfig.options.map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-2 text-gray-300 mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="accent-purple-500"
                  checked={activeFilters.includes(option.value)}
                  onChange={() => toggleFilter(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}

        {/* Left spacer */}
        <div className="flex-1"></div>

        {/* 🔹 Products */}
        <div
          className="px-6 py-4 flex flex-col items-center"
          style={{ width: "960px" }}
        >
          <div className="grid grid-cols-4 gap-6 w-full">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-950 rounded-md p-4 h-[360px] flex flex-col items-center hover:scale-105 transition w-full"
              >
                <img
                  src={product.image_path}
                  alt={product.product_name}
                  className="w-full h-44 object-contain mb-3"
                />

                <h2
                  className="text-sm font-semibold text-center cursor-pointer hover:underline hover:text-blue-400 transition"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.product_name}
                </h2>

                <p className="text-gray-400 text-sm mt-1 mb-2">
                  ${product.price}
                </p>

                <button
                  className="w-full bg-black border border-purple-700 text-purple-400 text-sm font-semibold py-2 rounded 
                             hover:text-white hover:border-purple-500 
                             hover:shadow-[0_0_12px_rgba(168,85,247,0.6)] 
                             transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2 w-full">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-4 py-1 rounded border ${
                  page === currentPage
                    ? "bg-purple-700 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-purple-500 hover:text-white"
                } transition`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        {/* Right spacer */}
        <div className="flex-1"></div>
      </div>
    </div>
  );
}