import React from 'react'
import './MyBank.css'
import BankItem from '../BankItem/BankItem'

function MyBank() {
  return (
    <div className='bank'>
      <div className="bank-header">
        <h4>My Bank Account</h4>
        {/* <button className='bank-btn'><i class="far fa-plus" style={{marginRight: "10px"}}></i>Add bank account</button> */}
      </div>
      <div className="bank-body">
        <BankItem label="Name bank" value="NCB" />
        <BankItem label="Account number" value="9704198526191432198" />
        <BankItem label="Account name" value="NGUYEN VAN A" />
        <BankItem label="Release date" value="07/15" />
        <BankItem label="OTP password" value="123456" />
      </div>
    </div>
  )
}

export default MyBank