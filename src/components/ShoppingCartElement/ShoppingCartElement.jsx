import React, { useState, useEffect } from "react";
import "./ShoppingCartElement.css";
import { cartState } from "../../recoil/CartState";
import { useRecoilValue } from "recoil";
import CartShoppingItem from "../CartShoppingItem/CartShoppingItem";

function ShoppingCartElement() {
  const cart = useRecoilValue(cartState);
  return (
    <div className="cart-items">
      <div className="cart-item-list">
        {cart?.map((c, idx) => (
          <CartShoppingItem
            idx={idx}
            data={c}
          />
        ))}
      </div>
    </div>
  );
}

export default ShoppingCartElement;
