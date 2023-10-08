import React from "react";
import "./Pending.css";
import MyOrders from "../../components/MyOrders/MyOrders";

function Pending() {
  return (
    <div className="pending">
      <MyOrders admin={true} history={false} />
    </div>
  );
}

export default Pending;
