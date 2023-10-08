import React from "react";
import "./CardStyle.css";
import { Link } from "react-router-dom";

function CardSale(props) {
  const { data, price, percent, img } = props;
  const priceSale = price - (price * percent) / 100;
  return (
    <div className="c-sale">
      <div className="c-sale-percent">
        <i class="fas fa-bolt"></i>
        <p className="c-sale-percent-txt">-{percent}%</p>
      </div>
      <Link
        to={`/product/detail/${data?._id}`}
        style={{ textDecoration: "none" }}
      >
        <img src={img} style={{ height: "278px", width: "100%" }} />
      </Link>
      <div className="c-sale-price">
        <p className="c-sale-price-cost">${priceSale.toFixed(2)}</p>
        <del>
          <p className="c-sale-price-sale">{price.toFixed(2)}</p>
        </del>
      </div>
    </div>
  );
}

export default CardSale;
