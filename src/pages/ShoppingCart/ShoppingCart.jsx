import React from "react";
import "./ShoppingCart.css";
import { cartTotalQuantity, cartTotalPrice } from "../../recoil/CartState";
import { useRecoilValue } from "recoil";
import imgPayment from "../../assets/img/method-payment.png";
import ViewMore from "../../components/ViewMore/ViewMore";
import { Link } from "react-router-dom";
import ShoppingCartElement from "../../components/ShoppingCartElement/ShoppingCartElement";

function ShoppingCart() {
  const getTotalPrice = useRecoilValue(cartTotalPrice);
  const getTotalQuantity = useRecoilValue(cartTotalQuantity);

  return (
    <div style={{ width: "100%" }}>
      <div className="cart">
        <div style={{ width: "65%", marginRight: "30px" }}>
          <ShoppingCartElement />
        </div>
        <div className="cart-checkout">
          <div className="cart-checkout-total">
            <p className="cart-total-title">Order Summary</p>
            <div className="cart-total-price">
              <p style={{ fontWeight: "500" }}>Subtotal</p>
              <p className="cart-total-number">${getTotalPrice}</p>
            </div>
            <Link to="/checkout">
              <button className="cart-total-btn">
                Checkout Now ({getTotalQuantity})
              </button>
            </Link>
          </div>
          <div className="cart-checkout-method">
            <p className="cart-total-title">We Accept</p>
            <img src={imgPayment} alt="method payment" />
          </div>
          <div className="cart-shipping"></div>
        </div>
      </div>
      <div className="cart-view-more">
        <ViewMore
          title="You May Also Like"
          max={6}
          style={{ margin: "0px" }}
          styleItem={{ margin: "13px" }}
          isButton={true}
        />
      </div>
    </div>
  );
}

export default ShoppingCart;
