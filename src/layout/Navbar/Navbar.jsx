import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "../Header/Header.css";
import { TYPE } from "../../datas/DATA";
import { cartState } from "../../recoil/CartState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../recoil/UserState";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";
import orderService from "../../services/OrderService";

function Navbar(props) {
  const { selected, setSelected } = props;
  const navigate = useNavigate()
  const cart = useRecoilValue(cartState);
  const userLogin = useRecoilValue(userState);
  const setType = useSetRecoilState(toastType);
  const setTxt = useSetRecoilState(toastTxt);
  const setState = useSetRecoilState(toastState);
  // const [order, setOrder] = useState([]);
  const [pending, setPending] = useState(0)

  const settingToastMess = (type, txt) => {
    setState(true);
    setTxt(txt);
    setType(type);
  };

  const getCartTotal = () => {
    return cart?.reduce((sum, { quantity }) => sum + quantity, 0);
  };

  // const getPendingTotal = () => {
  //   return order?.reduce((sum, { status }) => {
  //     if (status == "00") {
  //       return sum + 1;
  //     } else return sum;
  //   }, 0);
  // };

  const getOrders = async () => {
    const res = await orderService.getOrders();
    setPending(res?.data.reduce((sum, { status }) => {
      if (status == "00") {
        return sum + 1;
      } else return sum;
    }, 0));
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="navbar">
      <div className="menu">
        {userLogin?.admin ? (
          <>
            <Link to="/product">
              <button
                className={
                  selected == "product" ? "menu-btn menu-btn-focus" : "menu-btn"
                }
                // onClick={() => setSelected("product")}
              >
                Product
              </button>
            </Link>
            <Link to="/history-order">
              <button
                className={
                  selected == "history-order" ? "menu-btn menu-btn-focus" : "menu-btn"
                }
                // onClick={() => setSelected("history-order")}
              >
                History orders
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/">
              <button
                className={
                  selected == "" ? "menu-btn menu-btn-focus" : "menu-btn"
                }
                onClick={() => setSelected("")}
              >
                Home
              </button>
            </Link>
            {TYPE?.map((t) => (
              <Link to={`/product/${t.value}`}>
                <button
                  className={
                    selected == t.value ? "menu-btn menu-btn-focus" : "menu-btn"
                  }
                  onClick={() => setSelected(t.value)}
                >
                  {t.label}
                </button>
              </Link>
            ))}
          </>
        )}

        {/* <div class="w3-dropdown-hover">
          <button class="menu-btn menu-dropdown">Dropdown</button>
          <div class="w3-dropdown-content w3-bar-block w3-card-4">
            <Link to="#" class="w3-bar-item w3-button">
              Link1
            </Link>
          </div>
        </div> */}
      </div>
      <div className="search">
        {/* <div className="search-form">
          <input type="text" className="search-input" placeholder="Search..." />
          <button className="search-btn">
            <i class="fas fa-search"></i>
          </button>
        </div> */}
        {userLogin?.admin ? (
          <Link to="/pending">
            <button
              className="btn-icon"
              style={{
                marginLeft: "10px",
                position: "relative",
                zIndex: "1",
              }}
            >
              <i class="fas fa-shopping-bag"></i>
              <p className="length-cart">{pending}</p>
            </button>
          </Link>
        ) : (
          <>
            {/* <button
              className={
                selected == "search" ? "btn-icon btn-icon-focus" : "btn-icon"
              }
              onClick={() => setSelected("search")}
            >
              <i class="far fa-search"></i>
            </button> */}
            <button
              className={
                selected == "favorite" ? "btn-icon btn-icon-focus" : "btn-icon"
              }
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setSelected("favorite");
                settingToastMess("info", "The skill is improving");
              }}
            >
              <i class="far fa-heart"></i>
            </button>
            <Link to={userLogin ? "/shopping-cart" : "/login"} >
              <button
                className={
                  selected == "shopping-cart"
                    ? "btn-icon btn-icon-focus"
                    : "btn-icon"
                }
                style={{
                  marginLeft: "10px",
                  position: "relative",
                  zIndex: "1",
                }}
                // onClick={() => setSelected("shopping-cart")}
              >
                <i class="far fa-shopping-cart"></i>
                {userLogin && (
                  <p
                    className={
                      selected == "shopping-cart"
                        ? "length-cart length-cart-focus"
                        : "length-cart"
                    }
                  >
                    {getCartTotal()}
                  </p>
                )}
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
