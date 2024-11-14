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
import UpperWear from "./pages/UpperWear";
import LowerWear from "./pages/LowerWear";
import UnderWear from "./pages/UnderWear";

function App() {
  const location = useLocation();
  console.log(location.pathname);
  const hideHeaderPaths = ["/signin", "/signup"];

  return (
    <>
      
      {hideHeaderPaths.includes(location.pathname) ? null : <Header />}
      <div
        className={`flex flex-col items-center ${
          !hideHeaderPaths.includes(location.pathname) && "pt-32"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/upperwear" element={<UpperWear />} />
          <Route path="/lowerwear" element={<LowerWear />} />
          <Route path="/underwear" element={<UnderWear />} />
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
