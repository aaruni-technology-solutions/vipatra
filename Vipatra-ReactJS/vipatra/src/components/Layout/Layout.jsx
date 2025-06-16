// src/components/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer'; // <-- 1. IMPORT THE FOOTER

const Layout = () => {
  return (
    // This is the main container for the entire application view
    <div className="flex flex-col h-screen bg-background">
      <Header />
      
      {/* This container holds the sidebar and the main scrolling content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        {/* This is the main content area that will scroll */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <Outlet /> {/* Your page components (Dashboard, Customers, etc.) render here */}
        </main>
      </div>

      {/* 2. ADD THE FOOTER HERE */}
      {/* It's outside the scrolling container, so it will be fixed at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;