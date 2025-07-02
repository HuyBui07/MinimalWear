import "./App.css";

// Libraries
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Order from "./pages/order/Order";
import OrderDetails from "./pages/order/OrderDetails";
import Product from "./pages/product/Product";

// Components
import SideBar from "./components/layouts/SideBar";
import AuthModal from "./components/AuthModal";
import { useEffect, useState } from "react";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      {isAuthModalOpen && <AuthModal setIsAuthModalOpen={setIsAuthModalOpen} />}
      <SideBar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={<Dashboard setIsAuthModalOpen={setIsAuthModalOpen} />}
        />
        <Route
          path="/order"
          element={<Order setIsAuthModalOpen={setIsAuthModalOpen} />}
        />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route
          path="/product"
          element={<Product setIsAuthModalOpen={setIsAuthModalOpen} />}
        />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
