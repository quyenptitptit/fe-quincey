import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CardStyle.css";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../recoil/UserState";
import { popupState } from "../../recoil/PopupState";
import { alertState } from "../../recoil/AlertState";
import PopupCart from "../PopupCart/PopupCart";

function CardItem(props) {
  const { data, style, name, setIsUpdate, setDataUpdate, setDisplayForm } =
    props;
  const [isCartPopup, setIsCartPopup] = useState(false);
  const [cartPopupData, setCartPopupData] = useState({});
  const setIsAlert = useSetRecoilState(alertState)
  const setPopup = useSetRecoilState(popupState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate()

  const handleDelete = () => {
    setPopup({
      status: true,
      id: data?._id,
    });
  };

  const handleUpdate = () => {
    setDataUpdate(data);
    setDisplayForm(true); // display form enter information
    setIsUpdate(true);
  };

  const handleAddToCard = () => {
    if (user) {
      setIsCartPopup(true);
      setCartPopupData(data);
    } else {
      setIsAlert(true)
    }
  };

  const getPriceSale = () => {
    const price = data?.price;
    return price - (price * data?.percent) / 100;
  };

  return (
    <div className="c-item" style={style} id={data?._id}>
      {isCartPopup && (
        <PopupCart
          isCartPopup={isCartPopup}
          setIsCartPopup={setIsCartPopup}
          data={cartPopupData}
        />
      )}
      {data?.sale && data?.percent > 0 && (
        <div className="c-sale-percent">
          <i class="fas fa-bolt"></i>
          <p className="c-sale-percent-txt">-{data?.percent}%</p>
        </div>
      )}
      <div className="c-item-img">
        {name ? (
          <button onClick={handleAddToCard}>Add to cart</button>
        ) : (
          <div className="c-item-img-btn">
            <button className="c-item-btn-edit" onClick={handleUpdate}>
              <i class="fas fa-wrench"></i>
            </button>
            <button className="c-item-btn-delete" onClick={handleDelete}>
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        )}
        <Link
          to={`/product/detail/${data?._id}`}
          style={{ textDecoration: "none" }}
        >
          <img src={data?.img[0]} style={{ height: "278px", width: "100%" }} />
        </Link>
      </div>
      <div className="c-item-infor">
        <p className="c-item-des">{data?.des}</p>
        <div className="c-item-tag">
          <p>#xuhuong</p>
          <p>#dacbiet</p>
        </div>
        {data?.sale && data?.percent > 0 ? (
          <div className="c-sale-price">
            <p className="c-sale-price-cost">${getPriceSale().toFixed(2)}</p>
            <del>
              <p className="c-sale-price-sale">{data?.price?.toFixed(2)}</p>
            </del>
          </div>
        ) : (
          <p className="c-item-cost">${data?.price?.toFixed(2)}</p>
        )}
        {/* <p className="c-item-cost">${data?.price}</p> */}
        <div className="c-item-review">
          <i class="fas fa-star" style={{ color: "var(--star-color)" }}></i>
          <i class="fas fa-star" style={{ color: "var(--star-color)" }}></i>
          <i class="fas fa-star" style={{ color: "var(--star-color)" }}></i>
          <i class="fas fa-star" style={{ color: "var(--star-color)" }}></i>
          <i class="fas fa-star" style={{ color: "#D8D9DA" }}></i>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
