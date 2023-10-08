import React from "react";
import "./PopupPayment.css";

function PopupPayment(props) {
  const { uri, setIsPayment } = props;
  return (
    <div className="pop-up">
      <div className="p-pop-up">
        <div class="popup-main">
          <div class="popup-title" style={{ fontWeight: "bold", fontSize: "120%" }}>
            Confirm payment
          </div>
          <div class="popup-content">
            <i class="fas fa-info-circle" style={{ color: "#254b8e", fontSize: "200%" }}></i>
            <p id="textPopup">
              Do you confirm that you want to pay for the order?
            </p>
          </div>
        </div>
        <div class="popup-footer">
          <button
            class="btn btn-cancel"
            id="btnCancelPopup"
            style={{ marginRight: "16px" }}
            onClick={() => setIsPayment(false)}
          >
            Cancel
          </button>
          <a href={uri} style={{textDecoration: "none"}}>
            <button
              class="btn btn-delete"
              style={{ backgroundColor: "#254b8e"}}
              // id="btnDelete"
            >
              Confirm
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default PopupPayment;
