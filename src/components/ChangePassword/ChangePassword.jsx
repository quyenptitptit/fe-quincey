import React, { useState, useEffect } from "react";
import "./ChangePassword.css";
import EnterNewPassword from "../EnterNewPassword/EnterNewPassword";
import userService from "../../services/UserService";
import { userState } from "../../recoil/UserState";
import { loadingState } from "../../recoil/LoadingState";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";
import { useRecoilValue, useSetRecoilState } from "recoil";

function ChangePassword() {
  const [isSendMail, setIsSendMail] = useState(false);
  const [otp, setOtp] = useState();
  const [inputOtp, setInputOtp] = useState()
  const [isNewPw, setIsNewPw] = useState(false)
  const userLogin = useRecoilValue(userState);
  const setLoading = useSetRecoilState(loadingState);
  const setStatus = useSetRecoilState(toastState);
  const setTxt = useSetRecoilState(toastTxt);
  const setType = useSetRecoilState(toastType);

  const settingToastMess = (type, txt) => {
    setStatus(true);
    setType(type);
    setTxt(txt);
  };

  const handleBack = () => {
    setIsSendMail(false);
    setOtp()
    setInputOtp()
  };

  const handleSendEmail = async () => {
    setLoading(true);
    const email = {
      email: userLogin?.email,
    };
    const res = await userService.sendEmail(email);
    if (res?.data?.errors) {
      settingToastMess("error", res?.data?.errors);
    } else {
      // console.log(res?.data);
      setOtp(res?.data);
      setIsSendMail(true);
    }
    setLoading(false);
  };

  const handleSendOtp = () => {
    if(otp !== inputOtp) {
      settingToastMess("error", "otp code is incorrect")
    } else {
      setIsNewPw(true)
    }
  }

  useEffect(() => {
    setOtp()
    setInputOtp()
  }, [isNewPw]);

  return (
    <div className="change">
      {isNewPw && <EnterNewPassword setIsSendMail={setIsSendMail} setIsNewPw={setIsNewPw} />}
      {isSendMail ? (
        <div className="send-email">
          <div className="send-email-header">
            <button className="send-email-btn" onClick={handleBack}>
              <i class="fas fa-arrow-left" style={{ fontSize: "200%" }}></i>
            </button>
            Verify with OTP code sent via email
          </div>
          <div className="send-email-body">
            <p style={{fontWeight: "500"}}>Please enter the password to be sent to the email address</p>
            <h5>{userLogin?.email}</h5>
            <div className="send-email-icon">
              <i class="fal fa-envelope"></i>
            </div>
            <div className="send-email-form">
              <input className="send-email-input" autoFocus onChange={(e) => setInputOtp(e.target.value)}/>
              <button className="send-email-btn-icon" onClick={handleSendOtp}>
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="changepassword">
          <div className="changepassword-icon">
            <i class="fas fa-shield-alt" style={{ color: "#1A5D1A" }}></i>
          </div>
          <p className="changepassword-txt">
            To increase the security of your account, verify your information
            using one of the following methods.
          </p>
          <button className="changepassword-btn" onClick={handleSendEmail}>
            <i class="far fa-envelope" style={{ marginRight: "10px" }}></i>{" "}
            Verify by email
          </button>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
