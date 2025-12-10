import React, { useState } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import AuthModal from './SubComponents/AuthModal';

function App() {
  const [authOpen, setAuthOpen] = useState(false);

  console.log("3. App Component STARTED Rendering");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Header Section */}
      <Header onOpenAuth={() => setAuthOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 bg-black">
        <Body />
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Auth Modal (Sign in / Sign Up Popup) */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
      />
    </div>
  );
}

export default App;
