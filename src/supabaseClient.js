import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ywqkhxyrzytryvlcdtmt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWtoeHlyenl0cnl2bGNkdG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMjU4NzgsImV4cCI6MjA4MjYwMTg3OH0.3yaxmrt7Ui0mVUKyrbOqsZIgo5lJcodtSjY8XsUAa5A"; // frontend-safe key
export const supabase = createClient(supabaseUrl, supabaseKey);
