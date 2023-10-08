import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import userService from "../../services/UserService";
import { useSetRecoilState, useRecoilState } from "recoil";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";
import { userState } from "../../recoil/UserState";
import { cartState } from "../../recoil/CartState";
import { loadingState } from "../../recoil/LoadingState";
import { validateRegister, validateLogin } from "../../utils/validateForm";
import PopupSendEmail from "../../components/Popup/PopupSendEmail";

function LoginPage(props) {
  const [isLogin, setIsLogin] = useState(props.isLogin);
  const [isPopup, setIsPopup] = useState(false);
  const [otp, setOtp] = useState();
  const location = useLocation().pathname.split("/");
  const setUserLogin = useSetRecoilState(userState);
  const [user, setUser] = useState({});
  const setType = useSetRecoilState(toastType);
  const setTxt = useSetRecoilState(toastTxt);
  const setState = useSetRecoilState(toastState);
  const setLoading = useSetRecoilState(loadingState);
  const setCart = useSetRecoilState(cartState);

  const naviagte = useNavigate();

  const settingToastMess = (type, txt) => {
    setState(true);
    setTxt(txt);
    setType(type);
  };

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    // e.preventDefault();
    setLoading(true);
    const res = await userService.register(user);
    console.log(res);
    if (res?.message) {
      settingToastMess("success", res?.message);
      setIsLogin(true);
      naviagte("/login");
      setUser({});
      setLoading(false);
    } else {
      settingToastMess("error", res?.data?.error);
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    setLoading(true);
    const email = {
      email: user?.email,
    };
    const res = await userService.sendEmail(email);
    console.log(res.data);
    if (res?.data?.errors) {
      settingToastMess("error", res?.data?.errors);
      setIsPopup(false);
    } else {
      // console.log(res?.data);
      setOtp(res?.data);
    }
    setLoading(false);
  };

  const handleClickRegister = () => {
    const error = validateRegister(user);
    if (error) {
      settingToastMess("warning", error);
    } else {
      handleSendEmail();
      setIsPopup(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const error = validateLogin(user);
    if (error) {
      settingToastMess("warning", error);
    } else {
      setLoading(true);
      const res = await userService.login(user);
      if (res?.message) {
        settingToastMess("success", res?.message);
        setUserLogin(res?.data);
        setCart(res?.data?.carts);
        setUser({});
        // console.log(res?.data)
        localStorage.setItem("user", JSON.stringify(res?.data));
        localStorage.setItem("cart", JSON.stringify(res?.data?.carts));
        if (res?.data?.admin) {
          naviagte("/product");
        } else {
          naviagte("/");
        }
        setLoading(false);
      } else {
        settingToastMess("error", res?.data?.error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (location[location.length - 1] == "login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [location]);

  return (
    <div className="login">
      {isPopup && (
        <PopupSendEmail
          handleRegister={handleRegister}
          otp={otp}
          userLogin={user}
          setIsPopup={setIsPopup}
        />
      )}
      <p className="login-qu">
        {isLogin
          ? "Do not have an account? "
          : "Do you already have an account? "}
        {isLogin ? (
          <Link
            onClick={() => {
              setIsLogin(!isLogin);
              setUser({});
            }}
            style={{ color: "#4F709C" }}
            to="/sign-up"
          >
            Sign up
          </Link>
        ) : (
          <Link
            onClick={() => {
              setIsLogin(!isLogin);
              setUser({});
            }}
            style={{ color: "#4F709C" }}
            to="/login"
          >
            Login
          </Link>
        )}
      </p>
      {isLogin ? (
        <div className="login-form">
          <Input
            autofocus
            type="text"
            require={true}
            label="Email"
            value={user?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            type="password"
            require={true}
            label="Password"
            value={user?.password || ""}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <div className="login-forgot">
            <Link to="" style={{ color: "#4F709C" }}>
              Forgot password?
            </Link>
          </div>
          <Button name="Login" onClick={(e) => handleLogin(e)} />
        </div>
      ) : (
        <div className="login-form">
          <Input
            autofocus
            type="text"
            require={true}
            label="Email"
            value={user?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            type="password"
            require={true}
            label="Password"
            value={user?.password || ""}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <Input
            type="text"
            require={true}
            label="Fullname"
            value={user?.fullname || ""}
            onChange={(e) => handleChange("fullname", e.target.value)}
          />
          <Input
            type="text"
            require={true}
            label="PhoneNumber"
            value={user?.phonenumber || ""}
            onChange={(e) => handleChange("phonenumber", e.target.value)}
          />
          <Button name="Sign Up" onClick={(e) => handleClickRegister(e)} />
        </div>
      )}
    </div>
  );
}

export default LoginPage;
