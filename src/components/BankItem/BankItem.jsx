import React from "react";
import './BankItem.css'

function BankItem(props) {
    const {label, value} = props 
  return (
    <div className="bank-item">
      <label className="bank-item-label">{label}:</label>
      <p>{value}</p>
    </div>
  );
}

export default BankItem;
