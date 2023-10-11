import React, { useState } from "react";
import Input from "../Input/Input";
import userService from "../../services/UserService";
import { loadingState } from "../../recoil/LoadingState";
import { useSetRecoilState, useRecoilState } from "recoil";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";

function PopupResetPass(props) {
  const { setIsResetPass, setIsEnterEmail, email } = props;
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
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
    if (password1 != password2) {
      settingToast("error", "Passwords do not match, please check again");
    } else {
      setLoading(true);
      const dataUpdate = {
        email: email,
        password: password1,
      };
      await userService.updatePassword(dataUpdate);
      settingToast("success", "Reset password successful!");
      setPassword1();
      setPassword2();
      setIsEnterEmail(false);
      setIsResetPass(false);
    }
    setLoading(false);
  };
  return (
    <div className="pop-up popup-reset-password">
      <div className="p-pop-up" style={{ width: "560px" }}>
        <div class="popup-main">
          <div
            class="popup-title"
            style={{ fontWeight: "bold", fontSize: "140%" }}
          >
            Reset password
          </div>
          <div className="p-popup-input">
            <Input type="password" label="password" onChange={(e) => setPassword1(e.target.value)} />
            <Input type="password" label="password again" onChange={(e) => setPassword2(e.target.value)} />
          </div>
        </div>
        <div class="popup-footer">
          <button
            class="btn btn-cancel"
            id="btnCancelPopup"
            style={{ marginRight: "16px" }}
            onClick={() => {
              setIsEnterEmail(false);
              setIsResetPass(false);
            }}
          >
            Cancel
          </button>
          <button
            class="btn"
            style={{ color: "white", backgroundColor: "#254b8e" }}
            onClick={handleClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupResetPass;
