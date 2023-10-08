import React from "react";
import './Popup.css'
import orderService from "../../services/OrderService";
import { useNavigate } from "react-router-dom";
import { cartState } from "../../recoil/CartState";
import { loadingState } from "../../recoil/LoadingState";
import { useSetRecoilState } from "recoil";

function PopupResult(props) {
  const { result, setIsResult } = props;
  const { success, order } = result;
  const navigate = useNavigate()
  const setCart = useSetRecoilState(cartState)
  const setLoading = useSetRecoilState(loadingState)

  const orderSuccess = async (order) => {
    setLoading(true)
    const res = await orderService.createOrder(order);
    console.log(res.data);
    setLoading(false)
  };

  const handleClose = () => {
    setIsResult(false);
  };

  const handleContinue = () => {
    orderSuccess(order)
    localStorage.removeItem("cart");
    setCart([])
    navigate("/account/orders")
  }

  return (
    <div>
      <div className="pop-up">
        <div className="p-pop-up">
          <div class="popup-main">
            {success ? (
              <div class="popup-content popup-content-column">
                <i
                  class="fas fa-check-circle"
                  style={{ color: "#159e37", fontSize: "250%" }}
                ></i>
                <h4 id="textPopup" style={{ fontWeight: "500" }}>
                  Payment success
                </h4>
                <p>We have received your order and will process it soon!</p>
              </div>
            ) : (
              <div class="popup-content popup-content-column">
                <i
                  class="fas fa-exclamation-triangle"
                  style={{ color: "#e13105", fontSize: "250%" }}
                ></i>
                <h4 id="textPopup" style={{ fontWeight: "500" }}>
                  Payment failed
                </h4>
                <p>Please check your payment information again!</p>
              </div>
            )}
          </div>
          {success ? (
            <div class="popup-footer">
              <button
                class="btn"
                style={{ color: "white", backgroundColor: "#159e37" }}
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          ) : (
            <div class="popup-footer">
              <button
                class="btn"
                style={{ color: "white", backgroundColor: "#e13105" }}
                onClick={handleClose}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopupResult;
