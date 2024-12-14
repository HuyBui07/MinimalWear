import "./App.css";

// Libraries
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

//Pages
import Home from "./pages/Home";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import UpperWear from "./pages/categories/UpperWear";
import LowerWear from "./pages/categories/LowerWear";
import UnderWear from "./pages/categories/UnderWear";
import ProductDetails from "./pages/ProductDetails";
import Member from "./pages/member/Member";
import EditMember from "./pages/member/EditMember";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Delivery from "./pages/checkout/Delivery";
import Payment from "./pages/checkout/Payment";
import OrderReview from "./pages/checkout/OrderReview";

function App() {
  const location = useLocation();
  console.log(location.pathname);
  const hideHeaderPaths = ["/signin", "/signup"];

  return (
    <>
      {hideHeaderPaths.includes(location.pathname) ? null : <Header />}
      <div
        className={`flex flex-col items-center ${
          !hideHeaderPaths.includes(location.pathname) && "pt-28"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/upperwear" element={<UpperWear />} />
          <Route path="/lowerwear" element={<LowerWear />} />
          <Route path="/underwear" element={<UnderWear />} />
          <Route path="/products" element={<ProductDetails />} />
          <Route path="/member" element={<Member />} />
          <Route path="/member/edit" element={<EditMember />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout/delivery" element={<Delivery />} />
          <Route path="/checkout/payment" element={<Payment />} />
          <Route path="/checkout/orderreview" element={<OrderReview />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
      {hideHeaderPaths.includes(location.pathname) ? null : <Footer />}
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
