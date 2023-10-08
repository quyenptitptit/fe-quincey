import React, { useState, useEffect } from "react";
import "./CartShoppingItem.css";
import {
  addItem,
  cartState,
  deleteCart,
  subItem,
} from "../../recoil/CartState";
import PopupCart from "../PopupCart/PopupCart";
import { Link } from "react-router-dom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";

function CartShoppingItem(props) {
  const { data, idx, order } = props;
  const [cart, setCart] = useRecoilState(cartState);
  const [isCartPopup, setIsCartPopup] = useState(false);
  const setState = useSetRecoilState(toastState);
  const setTxt = useSetRecoilState(toastTxt);
  const setType = useSetRecoilState(toastType);

  const settingToastMess = (type, txt) => {
    setState(true);
    setTxt(txt);
    setType(type);
  };

  const getPriceSale = (price, percent) => {
    return (price - (price * percent) / 100).toFixed(2);
  };

  const handleAddItem = () => {
    const newCart = addItem(cart, idx);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleSubItem = () => {
    if (data?.quantity > 1) {
      const newCart = subItem(cart, idx);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const handleDeleteItem = () => {
    const newCart = deleteCart(cart, idx);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleLike = () => {
    settingToastMess("info", "The skill are improving");
  };

  return (
    <div className="cart-item">
      {isCartPopup && (
        <PopupCart
          idx={idx}
          isCartPopup={isCartPopup}
          setIsCartPopup={setIsCartPopup}
          data={data?.product}
          dataCartItem={data}
        />
      )}
      {order ? (
        <div
          to={`/product/detail/${data?.product?._id}`}
          style={{ textDecoration: "none" }}
        >
          <img src={data?.product?.img[0]} className="cart-item-img" />
        </div>
      ) : (
        <Link
          to={`/product/detail/${data?.product?._id}`}
          style={{ textDecoration: "none" }}
        >
          <img src={data?.product?.img[0]} className="cart-item-img" />
        </Link>
      )}
      <div className="cart-item-infor">
        <div className="cart-item-selected">
          <p className="cart-item-des">{data?.product?.des}</p>
          {order ? (
            <p className="cart-item-size">
              {data?.color} / {data?.size}
            </p>
          ) : (
            <p className="cart-item-color" onClick={() => setIsCartPopup(true)}>
              {data?.color} / {data?.size}
            </p>
          )}
        </div>
        <div className="cart-item-select">
          {data?.product?.sale ? (
            <div className="cart-item-price">
              <p style={{ marginRight: "10px" }}>
                ${getPriceSale(data?.product?.price, data?.product?.percent)}
              </p>
              <del>${data?.product?.price}</del>
              {order && (
                <p> <i style={{marginRight: "5px", marginLeft: "5px"}}>x</i> {data?.quantity}</p>
              )}
            </div>
          ) : (
            <div className="cart-item-price">
              <p style={{ marginRight: "10px" }}>${data?.product?.price}</p>
              {order && (
                <p> <i style={{marginRight: "5px"}}>x</i> {data?.quantity}</p>
              )}
            </div>
          )}
          {!order && (
            <div className="cart-item-option">
              <div className="cart-input-quantity">
                <button
                  className="cart-input-select cart-input-sub"
                  onClick={handleSubItem}
                >
                  <i class="fas fa-minus"></i>
                </button>
                <input
                  type="text"
                  className="cart-input-display"
                  value={data?.quantity}
                />
                <button
                  className="cart-input-select cart-input-add"
                  onClick={handleAddItem}
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <button
                className="cart-btn cart-btn-favorite"
                onClick={handleLike}
              >
                <i class="far fa-heart"></i>
              </button>
              <button
                className="cart-btn cart-btn-delete"
                onClick={handleDeleteItem}
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartShoppingItem;
