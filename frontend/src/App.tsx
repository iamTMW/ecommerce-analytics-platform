import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import RevenuePage from "./pages/RevenuePage";
import CustomersPage from "./pages/CustomersPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">

        {/* Sidebar */}
        <div className="w-64 p-4 bg-gray-100 min-h-screen">
          <h2 className="text-xl font-bold mb-6">E-Commerce Analysis</h2>

          <nav className="flex flex-col gap-3">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/products" className="hover:underline">Products</Link>
            <Link to="/revenue" className="hover:underline">Revenue</Link>
            <Link to="/customers" className="hover:underline">Customers</Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/revenue" element={<RevenuePage />} />
            <Route path="/customers" element={<CustomersPage />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
};

export default App;