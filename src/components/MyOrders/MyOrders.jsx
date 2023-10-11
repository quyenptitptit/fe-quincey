import React, { useState, useEffect } from "react";
import "./MyOrders.css";
import orderService from "../../services/OrderService";
import userService from "../../services/UserService";
import OrderItem from "../OrderItem/OrderItem";
import { loadingState } from "../../recoil/LoadingState";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../recoil/UserState";

function MyOrders(props) {
  const { admin, history } = props;
  const [isClickPopup, setIsClickPopup] = useState(false);
  const [orders, setOrders] = useState([]);
  const setLoading = useSetRecoilState(loadingState);
  const user = useRecoilValue(userState);

  const getOrders = async () => {
    setLoading(true);
    if (admin) {
      const res = await orderService.getOrders();
      setOrders(res?.data?.reverse());
      // console.log(res.data)
    } else {
      const res = await orderService.getOrderByCustomer(user?._id);
      // console.log(res?.data);
      setOrders(res?.data?.reverse());
    }
    setLoading(false);
  };

  const lengthPending = () => {
    return orders?.reduce((sum, { status }) => {
      if (status == "00") {
        return sum + 1;
      } else return sum;
    }, 0);
  };

  useEffect(() => {
    getOrders();
  }, [isClickPopup]);

  return (
    <div className="order">
      {(lengthPending() == 0 && admin && !history) || orders?.length == 0 ? (
        <p
          style={{
            fontSize: "200%",
            fontWeight: "500",
            textAlign: "center",
            color: "var(--grey-color)",
          }}
        >
          It is empty
        </p>
      ) : admin ? (
        history ? (
          <>
            {orders.reverse().map((order) => {
              if (order?.status != "00") {
                return (
                  <OrderItem
                    isClickPopup={isClickPopup}
                    setIsClickPopup={setIsClickPopup}
                    order={order}
                    admin={admin}
                  />
                );
              }
            })}
          </>
        ) : (
          <>
            {orders.reverse().map((order) => {
              if (order?.status == "00") {
                return (
                  <OrderItem
                    isClickPopup={isClickPopup}
                    setIsClickPopup={setIsClickPopup}
                    order={order}
                    admin={admin}
                  />
                );
              }
            })}
          </>
        )
      ) : (
        <>
          {orders.reverse().map((order) => (
            <OrderItem
              order={order}
              isClickPopup={isClickPopup}
              setIsClickPopup={setIsClickPopup}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default MyOrders;
