import React from "react";
import "./Popup.css";

function PopupOrder(props) {
  const { popup, setIsPopup } = props;
  const { txt, onClick } = popup;

  const handleCancel = () => {
    setIsPopup(false);
  };
  return (
    <div className="pop-up">
      <div className="p-pop-up">
        <div class="popup-main">
          <div class="popup-content">
          <i class="fas fa-info-circle" style={{color: "#254b8e", fontSize: "250%"}}></i>
            <p id="textPopup" style={{fontWeight: "500"}}>{txt}</p>
          </div>
        </div>
        <div class="popup-footer">
          <button
            class="btn btn-cancel"
            id="btnCancelPopup"
            style={{ marginRight: "16px" }}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button class="btn" style={{backgroundColor: "#254b8e", color: "white"}} onClick={onClick}>
            Cofirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupOrder;
