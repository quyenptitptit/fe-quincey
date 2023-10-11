import React, { useState } from "react";
import userService from "../../services/UserService";
import { loadingState } from "../../recoil/LoadingState";
import { useSetRecoilState, useRecoilState } from "recoil";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";

function PopupEnterEmail(props) {
  const { setIsEnterEmail, setIsPopup, onClick, email, setEmail } = props;
  const setLoading = useSetRecoilState(loadingState);
  const setStatus = useSetRecoilState(toastState);
  const setType = useSetRecoilState(toastType);
  const setTxt = useSetRecoilState(toastTxt);

  const settingToast = (type, txt) => {
    setStatus(true);
    setType(type);
    setTxt(txt);
  };

  const handleClick = async () => {
    setLoading(true);
    const res = await userService.checkEmail({ email: email });
    console.log(res);
    if (res?.data?.error) {
      settingToast("error", res?.data?.error);
    } else {
      onClick(email);
      setIsPopup(true);
    }
    setLoading(false);
  };
  return (
    <div className="pop-up popup-enter-password">
      <div className="p-pop-up">
        <div class="popup-main">
          <div
            class="popup-title"
            style={{ fontWeight: "bold", fontSize: "140%" }}
          >
            Reset password
          </div>
          <div>
            <p id="textPopup">
              Please enter your email address to reset password your account.
            </p>
            <input
              className="popup-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div class="popup-footer">
          <button
            class="btn btn-cancel"
            id="btnCancelPopup"
            style={{ marginRight: "16px" }}
            onClick={() => setIsEnterEmail(false)}
          >
            Cancel
          </button>
          <button
            class="btn"
            style={{ color: "white", backgroundColor: "#254b8e" }}
            onClick={handleClick}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupEnterEmail;
