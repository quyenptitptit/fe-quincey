import React from "react";
import "./Alert.css";
import { Link } from "react-router-dom";
import {alertState} from '../../recoil/AlertState'
import { useRecoilState } from "recoil";

function Alert(props) {
//   const { setIsAlert } = props;
  const [isAlert, setIsAlert] = useRecoilState(alertState)
  return (
    <div className="alert" style={isAlert ? {display: "flex"} : {display: "none"}}>
      <div className="alert-container">
        <div className="alert-text">
          <i
            class="fas fa-exclamation-circle"
            style={{ color: "#094e9d", fontSize: "150%" }}
          ></i>
          <p className="alert-txt">Please log in to continue!</p>
        </div>
        <div className="alert-button">
          <button className="alert-btn" onClick={() => setIsAlert(false)}>
            Cancel
          </button>
          <Link to="/login">
            <button className="alert-btn alert-btn-primary" onClick={() => setIsAlert(false)}>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Alert;
