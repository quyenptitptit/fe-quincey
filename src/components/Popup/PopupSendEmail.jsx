import React, { useState } from "react";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";
import { useRecoilValue, useSetRecoilState } from "recoil";

function PopupSendEmail(props) {
  const {
    setIsPopup,
    userLogin,
    otp,
    setOtp,
    handleClick,
    isEnterEmail,
    setIsResetPass,
  } = props;
  const [inputOtp, setInputOtp] = useState();
  const setStatus = useSetRecoilState(toastState);
  const setTxt = useSetRecoilState(toastTxt);
  const setType = useSetRecoilState(toastType);

  const settingToastMess = (type, txt) => {
    setStatus(true);
    setType(type);
    setTxt(txt);
  };

  const handleSendOtp = () => {
    if (otp != inputOtp) {
      settingToastMess("error", "otp code is incorrect");
    } else {
      if (isEnterEmail) {
        setIsPopup(false);
        setIsResetPass(true)
      } else {
        handleClick();
        setInputOtp(false);
        setOtp();
      }
    }
  };

  const handleBack = () => {
    setIsPopup(false);
    setOtp();
  };

  return (
    <div className="modal-send-email">
      <div className="popup-send-email">
        <div className="send-email-header">
          <button className="send-email-btn" onClick={handleBack}>
            <i class="fas fa-arrow-left" style={{ fontSize: "200%" }}></i>
          </button>
          Verify with OTP code sent via email
        </div>
        <div className="send-email-body">
          <p style={{ fontWeight: "500" }}>
            Please enter the password to be sent to the email address
          </p>
          <h5>{userLogin?.email}</h5>
          <div className="send-email-icon">
            <i class="fal fa-envelope"></i>
          </div>
          <div className="send-email-form">
            <input
              autoFocus
              className="send-email-input"
              onChange={(e) => setInputOtp(e.target.value)}
            />
            <button className="send-email-btn-icon" onClick={handleSendOtp}>
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupSendEmail;
