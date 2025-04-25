import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import Cart from "./pages/cart";
import EmptyCart from "./pages/emptycart";
import Login from "./pages/login";
import Register from "./pages/register";
import OrderConfirmation from "./pages/orderconfirmation";
import Profile from "./pages/profile";


export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/empty-cart" element={<EmptyCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
