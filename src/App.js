import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import DetailInformation from "./pages/DetailInformation/DetailInformation";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import ShoppingCartElement from "./components/ShoppingCartElement/ShoppingCartElement";
import Account from "./pages/Account/Account";
import MyProfile from './components/MyProfile/MyProfile'
import MyOrders from './components/MyOrders/MyOrders'
import MyBank from "./components/MyBank/MyBank";
import MyAddress from "./components/MyAddress/MyAddress";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import Pending from "./pages/Pending/Pending";
import HistoryOrder from "./pages/HistoryOrder/HistoryOrder";

function App() {
  
  return (
    <Routes>
      <Route path="/" exact element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage isLogin={true} />} />
        <Route path="/sign-up" element={<LoginPage isLogin={false} />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:name" element={<ProductPage />} />
        <Route path="/product/detail/:id" element={<DetailInformation />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<PaymentPage />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/history-order" element={<HistoryOrder />} />
        <Route path="/account" element={<Account />}>
          <Route path="/account/profile" element={<MyProfile />} />
          <Route path="/account/orders" element={<MyOrders />} />
          <Route path="/account/bank" element={<MyBank />} />
          <Route path="/account/address" element={<MyAddress />} />
          <Route path="/account/change-password" element={<ChangePassword />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
