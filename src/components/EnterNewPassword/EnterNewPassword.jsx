import React, { lazy, useState } from "react";
import "./EnterNewPassword.css";
import userService from "../../services/UserService";
import { useSetRecoilState, useRecoilState } from "recoil";
import { userState } from "../../recoil/UserState";
import { loadingState } from "../../recoil/LoadingState";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";

function EnterNewPassword(props) {
  const { setIsSendMail, setIsNewPw } = props;
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [user, setUser] = useRecoilState(userState);
  const setLoading = useSetRecoilState(loadingState);
  const setStatus = useSetRecoilState(toastState);
  const setType = useSetRecoilState(toastType);
  const setTxt = useSetRecoilState(toastTxt);

  const settingToast = (type, txt) => {
    setStatus(true);
    setType(type);
    setTxt(txt);
  };

  const handleClickCancel = () => {
    setIsNewPw(false);
    setIsSendMail(false);
  };

  const handleClickSave = async () => {
    setLoading(true);
    if (password != password2) {
      settingToast("error", "Passwords do not match, please check again");
    } else {
      const dataUpdate = {
        email: user?.email,
        password: password,
      };
      await userService.updatePassword(dataUpdate);
      const res = await userService.getUser(user?._id);
      settingToast("success", "Update password successful!");
      setUser(res?.data);
      localStorage.setItem("user", JSON.stringify(res?.data));
      setIsNewPw(false);
      setIsSendMail(false);
      setPassword();
      setPassword2();
    }
    setLoading(false);
  };

  return (
    <div className="new-pw">
      <div className="new-pw-container">
        <div className="new-pw-header">Enter your new password</div>
        <div className="new-pw-body">
          <input
            type="password"
            placeholder="Password"
            className="new-pw-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="new-pw-input"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="new-pw-footer">
          <button
            className="new-pw-btn new-pw-btn-cancel"
            onClick={handleClickCancel}
          >
            Cancel
          </button>
          <button className="new-pw-btn" onClick={handleClickSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnterNewPassword;
