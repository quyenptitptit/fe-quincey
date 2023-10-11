import React from "react";
import "./Alert.css";
import { Link } from "react-router-dom";
import { alertState } from "../../recoil/AlertState";
import { useRecoilState } from "recoil";

function Alert(props) {
  //   const { setIsAlert } = props;
  const [isAlert, setIsAlert] = useRecoilState(alertState);
  return (
    <div
      className="pop-up"
      style={isAlert ? { display: "flex" } : { display: "none" }}
    >
      <div className="p-pop-up">
        <div class="popup-main">
          <div class="popup-content">
            <i
              class="fas fa-exclamation-triangle"
              style={{ color: "#094e9d", fontSize: "150%" }}
            ></i>
            <p className="alert-text">Log in to continue?</p>
          </div>
        </div>
        <div class="popup-footer">
          <button
            class="btn btn-cancel"
            id="btnCancelPopup"
            style={{ marginRight: "16px" }}
            onClick={() => setIsAlert(false)}
          >
            Cancel
          </button>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button
              class="btn alert-btn-primary"
              onClick={() => setIsAlert(false)}
            >
              Log in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Alert;
