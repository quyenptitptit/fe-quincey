import React, { useState } from "react";
import "./OrderItem.css";
import CartShoppingItem from "../CartShoppingItem/CartShoppingItem";
import orderService from "../../services/OrderService";
import PopupOrder from "../Popup/PopupOrder";
import { loadingState } from "../../recoil/LoadingState";
import { useSetRecoilState } from "recoil";

function OrderItem(props) {
  const { order, admin, isClickPopup, setIsClickPopup } = props;
  const [newOrder, setNewOrder] = useState(order);
  const [popup, setPopup] = useState();
  const [isPopup, setIsPopup] = useState(false);
  const setLoading = useSetRecoilState(loadingState);

  const handleCofirm = () => {
    setIsPopup(true);
    setPopup({
      txt: "Are you sure you want to cofirm order?",
      onClick: onClickCofirm,
    });
  };

  const onClickCofirm = async () => {
    // admin xac nhan don hang
    setLoading(true);
    setNewOrder({ ...newOrder, status: "11" });
    await orderService.updateOrder(order._id, { ...newOrder, status: "11" });
    setIsClickPopup(!isClickPopup);
    setIsPopup(false);
    setLoading(false);
  };

  const handleCancel = () => {
    setIsPopup(true);
    setPopup({
      txt: "Are you sure you want to cancel order?",
      onClick: onClickCancel,
    });
  };

  const onClickCancel = async () => {
    // admin huy don
    setLoading(true);
    setNewOrder({ ...newOrder, status: "01" });
    await orderService.updateOrder(order._id, { ...newOrder, status: "01" });
    setIsClickPopup(!isClickPopup);
    setIsPopup(false);
    setLoading(false);
  };

  // khach hang huy don
  const handlePending = () => {
    setIsPopup(true);
    setPopup({
      txt: "Are you sure you want to cancel your order?",
      onClick: onClickPending,
    });
  };

  const onClickPending = async () => {
    setLoading(true);
    setNewOrder({ ...newOrder, status: "10" });
    await orderService.updateOrder(order._id, { ...newOrder, status: "10" });
    setIsClickPopup(!isClickPopup);
    setIsPopup(false);
    setLoading(false);
  };

  return (
    <div className="order-item">
      {isPopup && <PopupOrder setIsPopup={setIsPopup} popup={popup} />}
      <div className="order-item-header">
        <div>
          {order?.status == "00" &&
            (admin ? (
              <>
                <button onClick={handleCancel}>Cancel order</button>
                <button
                  style={{
                    borderColor: "#159e37",
                    color: "#159e37",
                    marginLeft: "10px",
                  }}
                  onClick={handleCofirm}
                >
                  Cofirm order
                </button>
              </>
            ) : (
              <button onClick={handlePending}>Pending</button>
            ))}
          {order?.status == "01" &&
            (admin ? <p>Canceled</p> : <p>Shop canceled</p>)}
          {order?.status == "10" &&
            (admin ? <p>Customer canceled</p> : <p>Canceled</p>)}
          {order?.status == "11" && (
            <p style={{ color: "#159e37", borderColor: "#159e37" }}>
              Completed
            </p>
          )}
        </div>
        <h5>Subtotal: ${order?.subtotal}</h5>
      </div>
      {order?.items?.map((product, idx) => (
        <CartShoppingItem idx={idx} data={product} order={true} />
      ))}
    </div>
  );
}

export default OrderItem;
