import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import userService from "../../services/UserService";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartState } from "../../recoil/CartState";
import { userState } from "../../recoil/UserState";
import { loadingState } from "../../recoil/LoadingState";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";

function Header(props) {
  const { selected, setSelected } = props;
  const [cart, setCart] = useRecoilState(cartState)
  const [isClick, setIsClick] = useState(false);
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const setLoading = useSetRecoilState(loadingState)
  const setType = useSetRecoilState(toastType);
  const setTxt = useSetRecoilState(toastTxt);
  const setState = useSetRecoilState(toastState);
  
  const navigate = useNavigate()
  
  const settingToastMess = (type, txt) => {
    setState(true);
    setTxt(txt);
    setType(type);
  };

  const handleClickLogout = async () => {
    setLoading(true)
    setIsClick(false)
    await userService.updateUser(userLogin?._id, {carts: cart})
    setUserLogin()
    setCart()
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
    navigate("/")
    settingToastMess("success", "Logged!")
    setLoading(false)
  }

  // useEffect(() => {
  //   console.log(userLogin)
  // }, [userLogin]);

  return (
    <div className="header">
      <div className="logo">
        <div className="logo-left">
          <button
            className={
              selected == "mail" ? "btn-icon btn-icon-focus" : "btn-icon"
            }
            title="quyennt.201@gmail.com"
            onClick={() => {
              // setSelected("mail");
              settingToastMess("info", "The skill is improving")
            }}
          >
            <i class="far fa-envelope"></i>
          </button>
          {/* <button className="btn-icon"><i class="fas fa-phone"></i></button> */}
        </div>
        <div className="logo-mid">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
              letterSpacing: "10px",
            }}
            onClick={() => setSelected("")}
          >
            QUINCEY
          </Link>
        </div>
        <div className="logo-right">
          <button
            className={
              selected == "sign-up" || selected == "login"
                ? "btn-icon btn-icon-focus"
                : "btn-icon"
            }
            onClick={() => {
              setIsClick(!isClick);
            }}
          >
            {userLogin ? <img style={{height: "30px", width: "30px", borderRadius: "50%"}} src={userLogin?.avatar} /> : <i class="far fa-user" style={{height: "30px", width: "30px"}}></i>}
          </button>
          {isClick &&
            (userLogin ? (
              <div className="header-user">
                <p className="header-user-item-top">{userLogin?.fullname}</p>
                <Link
                  to="/account/profile"
                  onClick={() => {
                    setIsClick(false);
                    // setSelected("user");
                  }}
                >
                  <button className="header-user-item">My Profile</button>
                </Link>
                <Link
                  to="/account/orders"
                  onClick={() => {
                    setIsClick(false);
                    // setSelected("user");
                  }}
                >
                  <button className="header-user-item">My Orders</button>
                </Link>
                <button className="header-user-item header-user-item-bottom" onClick={handleClickLogout}>Logout</button>
              </div>
            ) : (
              <div className="header-user">
                <Link
                  to="/login"
                  onClick={() => {
                    setIsClick(false);
                    // setSelected("user");
                  }}
                >
                  <button className="header-user-item">Login</button>
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => {
                    setIsClick(false);
                    // setSelected("user");
                  }}
                >
                  <button className="header-user-item header-user-item-bottom">Sign Up</button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
