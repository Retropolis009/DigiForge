import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import AuthModal from "./SubComponents/AuthModal";
import ComponentPage from "./redir/ComponentPage";

function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) setUser(savedUser);
  }, []);

  // 🔹 Shared layout wrapper
  const Layout = ({ children }) => (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header onOpenAuth={() => setAuthOpen(true)} user={user} />
      <main className="flex-1 bg-black">{children}</main>
      <Footer />
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={(username) => {
          setUser(username);
          localStorage.setItem("username", username);
          setAuthOpen(false);
        }}
      />
    </div>
  );

  return (
    <Router basename="/DigiForge">
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Layout>
              <Body />
            </Layout>
          }
        />

        {/* Component Catalog */}
        <Route
          path="/component/:component"
          element={
            <Layout>
              <ComponentPage />
            </Layout>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <Layout>
              <h2 className="text-white text-center mt-20">
                Page not found
              </h2>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;