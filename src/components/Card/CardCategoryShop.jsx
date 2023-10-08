import React from "react";
import { Link } from "react-router-dom";
import "./CardStyle.css";

function CardCategoryShop(props) {
  return (
    <div className="c-category-shop">
      <img src={props.img} />
      <Link className="c-category-shop-btn" to={props.path}><button>{props.text}</button></Link>
    </div>
  );
}

export default CardCategoryShop;
