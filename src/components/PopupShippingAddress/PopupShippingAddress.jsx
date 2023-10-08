import React, { useState } from "react";
import "./PopupShippingAddress.css";
import AddressItem from "../AddressItem/AddressItem";
import { Link } from "react-router-dom";

function PopupShippingAddress(props) {
  const { user, setAddress, setIsPopup } = props;
  const [listAddress, setListAddress] = useState(user?.address);

  const handleClick = (address) => {
    setAddress(address);
    setIsPopup(false);
  };

  return (
    <div className="popup-shipping">
      <div className="modal-shipping">
        <div className="popup-shipping-close" onClick={() => setIsPopup(false)}>
          <i class="fas fa-times"></i>
        </div>
        <div
          className="payment-title"
          style={{ textAlign: "center" }}
        >
          Shipping Address
        </div>
        <div className="popup-shipping-body">
          {listAddress?.map((address) => (
            <div
              className="payment-border popup-shipping-border"
              onClick={() => handleClick(address)}
            >
              <AddressItem
                address={address}
                hideIcon={true}
                style={{ border: "none" }}
              />
            </div>
          ))}
          <Link to="/account/address">
            <button className="payment-title popup-shipping-btn">
              <i class="fas fa-plus" style={{ marginRight: "5px" }}></i>Add new
              address
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PopupShippingAddress;
