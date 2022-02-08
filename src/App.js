import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import ShopSignUp from "./pages/ShopSignUp";
import SellerShop from "./pages/SellerShop";
import Item from "./pages/C_Item";
import UpdateItem from "./pages/U_Item";
import UserShop from "./pages/UserShop";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import OrderPage from "./pages/OrdersPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/shop" element={<SellerShop />} />
        <Route path="/shop-sign-up" element={<ShopSignUp />} />
        <Route path="/create-item" element={<Item />} />
        <Route path="/update-item/:itemId" element={<UpdateItem />} />
        <Route path="/shop/:shopId" element={<UserShop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
