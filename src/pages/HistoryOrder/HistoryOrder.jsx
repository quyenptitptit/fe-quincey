import React from 'react'
import './HistoryOrder.css'
import MyOrders from "../../components/MyOrders/MyOrders";

function HistoryOrder() {
    return (
      <div className="history">
        <MyOrders admin={true} history={true} />
      </div>
    );
}

export default HistoryOrder