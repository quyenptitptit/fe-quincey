import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/UserState";
import { Link } from "react-router-dom";
import iconOrder from "../../assets/icons/order.png";
import iconUser from "../../assets/icons/user.png";
import "./Account.css";

function Account() {
  const location = useLocation().pathname.split("/");
  const [isAccount, setIsAccount] = useState(false);
  const [selected, setSelected] = useState(location[location.length - 1]);
  const user = useRecoilValue(userState);

  useEffect(() => {
    setSelected(location[location.length - 1]);
    if(location[location.length - 1] == "orders") {
      setIsAccount(false)
    }
    else {
      setIsAccount(true)
    }
  }, [location]);

  return (
    <div className="account">
      <div className="account-menu">
        <div className="account-menu-header">
          <img src={user?.avatar} style={{ height: "50px", width: "50px" }} />
          <p>{user?.email}</p>
        </div>
        <div className="account-menu-list">
          <Link
            to="/account/profile"
            className="btn-account"
            onClick={() => {
              // setIsAccount(true);
              setSelected("profile");
            }}
          >
            <img
              style={{ height: "25px", width: "25px", marginRight: "5px" }}
              src={iconUser}
            />{" "}
            My Account
          </Link>
          {isAccount && (
            <>
              <Link
                to="/account/profile"
                className={
                  selected == "profile"
                    ? "btn-account-item btn-account-item-focus"
                    : "btn-account-item"
                }
                onClick={() => {
                  setSelected("profile");
                }}
              >
                Profile
              </Link>
              {/* <Link
                to="/account/bank"
                className={
                  selected == "bank"
                    ? "btn-account-item btn-account-item-focus"
                    : "btn-account-item"
                }
                onClick={() => {
                  setSelected("bank");
                }}
              >
                Bank
              </Link> */}
              <Link
                to="/account/address"
                className={
                  selected == "address"
                    ? "btn-account-item btn-account-item-focus"
                    : "btn-account-item"
                }
                onClick={() => {
                  setSelected("address");
                }}
              >
                Address
              </Link>
              <Link
                to="/account/change-password"
                className={
                  selected == "change-password"
                    ? "btn-account-item btn-account-item-focus"
                    : "btn-account-item"
                }
                onClick={() => {
                  setSelected("change-password");
                }}
              >
                Change Password
              </Link>
            </>
          )}
          <Link
            to="/account/orders"
            className={
              selected == "orders"
                ? "btn-account btn-account-focus"
                : "btn-account"
            }
            onClick={() => {
              // setIsAccount(false);
              setSelected("my-order");
            }}
          >
            <img
              style={{ height: "25px", width: "25px", marginRight: "5px" }}
              src={iconOrder}
            />{" "}
            My Orders
          </Link>
        </div>
      </div>
      <div className="account-information">
        <Outlet />
      </div>
    </div>
  );
}

export default Account;
