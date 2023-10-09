import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import { userState } from "../../recoil/UserState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AddressItem from "../../components/AddressItem/AddressItem";
import PopupShippingAddress from "../../components/PopupShippingAddress/PopupShippingAddress";
import {
  cartState,
  cartTotalPrice,
  cartTotalCost,
  cartTotalQuantity,
} from "../../recoil/CartState";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";
import paymentService from "../../services/PaymentService";
import PopupPayment from "../../components/PopupPayment/PopupPayment";
import { useNavigate } from "react-router-dom";
import PopupResult from "../../components/Popup/PopupResult";

function PaymentPage() {
  const url = window.location.href;
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const cart = useRecoilValue(cartState);
  const [address, setAddress] = useState(user?.address[0]);
  const [isPopup, setIsPopup] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState(false);
  const [uri, setUri] = useState();
  const getTotalPrice = useRecoilValue(cartTotalPrice);
  const getTotalCost = useRecoilValue(cartTotalCost);
  const getTotalQuantity = useRecoilValue(cartTotalQuantity);
  const [pay, setPay] = useState({
    language: "en",
    amount: getTotalPrice * 24400,
  });
  const setState = useSetRecoilState(toastState);
  const setTxt = useSetRecoilState(toastTxt);
  const setType = useSetRecoilState(toastType);

  const settingToast = (type, txt) => {
    setState(true);
    setType(type);
    setTxt(txt);
  };

  const handleChange = (value) => {
    setPay({ ...pay, ["bankCode"]: value });
  };

  const handleClickPayment = async () => {
    console.log(pay);
    if (!pay.bankCode) {
      settingToast("error", "Please choose payment method");
    } else {
      // await paymentService.payment(pay)
      const res = await paymentService.payment(pay);
      setUri(res);
      setIsPayment(true);
    }
  };

  const getParameterByName = (name) => {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  useEffect(() => {
    const vnp_ResponCode = getParameterByName("vnp_ResponseCode");
    if (vnp_ResponCode == "00") {
      setIsResult(true);
      setResult({
        success: true,
        order: {
          items: cart,
          customer: user?._id,
          shippingaddress: address,
          subtotal: getTotalPrice,
          status: "00",
        },
      });
    } else if (vnp_ResponCode == "24") {
      setIsResult(true);
      setResult({
        success: false,
        order: {},
      });
    }
  }, [url]);

  return (
    <div className="payment">
      {isResult && <PopupResult result={result} setIsResult={setIsResult} />}
      {isPopup && (
        <PopupShippingAddress
          setIsPopup={setIsPopup}
          user={user}
          setAddress={setAddress}
        />
      )}
      {isPayment && <PopupPayment setIsPayment={setIsPayment} uri={uri} />}
      <div className="payment-filling">
        <div className="payment-shipping-address">
          <div className="payment-shipping-title">
            <h4 className="payment-title">Shipping Address</h4>
            <button
              className="payment-change-address"
              onClick={() => setIsPopup(true)}
            >
              Change
              <i
                class="fas fa-chevron-right"
                style={{ marginLeft: "10px" }}
              ></i>
            </button>
          </div>
          {address ? <div className="payment-border">
            <AddressItem
              address={address}
              hideIcon={true}
              style={{ border: "none" }}
            />
          </div> : <p>[Add address]</p>}
        </div>
        <div className="payment-method">
          <h4 className="payment-title">Payment method</h4>
          <form className="payment-method-body">
            <label>
              <input
                type="radio"
                value="VNPAYQR"
                className="payment-radio"
                name="payment"
                onChange={(e) => handleChange(e.target.value)}
              />
              Payment via application supporting VNPAYQR
            </label>
            <label>
              <input
                type="radio"
                value="VNBANK"
                className="payment-radio"
                name="payment"
                onChange={(e) => handleChange(e.target.value)}
              />
              Payment via ATM-Domestic bank account
            </label>
            <label>
              <input
                type="radio"
                value="INTCARD"
                className="payment-radio"
                name="payment"
                onChange={(e) => handleChange(e.target.value)}
              />
              Payment via international card
            </label>
            {/* <label>
              <input
                type="radio"
                value="CASH"
                className="payment-radio"
                name="payment"
                onChange={(e) => handleChange(e.target.value)}
              />
              Payment in cash
            </label> */}
          </form>
        </div>
      </div>
      <div className="payment-summary">
        <h4 className="payment-title">Order summary</h4>
        <div className="payment-summary-item">
          <p>Quantity:</p>
          <p>{getTotalQuantity} items</p>
        </div>
        <div className="payment-summary-item">
          <p>Retail Price:</p>
          <del>${getTotalCost}</del>
        </div>
        <div className="payment-summary-item">
          <p>Subtotal:</p>
          <p style={{ fontSize: "120%", fontWeight: "700" }}>
            ${getTotalPrice}
          </p>
        </div>
        <div className="payment-summary-item">
          <p>Save:</p>
          <p>${(getTotalCost - getTotalPrice).toFixed(2)}</p>
        </div>
        <button
          className="cart-total-btn"
          style={{ marginTop: "10px" }}
          onClick={handleClickPayment}
        >
          Continue to payment
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
