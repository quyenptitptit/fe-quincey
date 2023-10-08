import React, { useState, useEffect } from "react";
import "./MyAddress.css";
import AddressItem from "../AddressItem/AddressItem";
import AddressPopup from "../AddressPopup/AddressPopup";
import { userState } from "../../recoil/UserState";
import { useRecoilState } from "recoil";

function MyAddress() {
  const [isPopup, setIsPopup] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [isDelete, setIsDelete] = useState(false);

  const handleAddress = () => {
    setIsPopup(true);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [isPopup, isDelete]);

  return (
    <div className="address">
      {isPopup && <AddressPopup isPopup={isPopup} setIsPopup={setIsPopup} />}
      <div className="bank-header">
        <h4>My Address</h4>
        <button className="bank-btn" onClick={handleAddress}>
          <i class="far fa-plus" style={{ marginRight: "10px" }}></i>
          Add new address
        </button>
      </div>
      <div className="address-body">
        {user?.address.map((add) => (
          <AddressItem
            address={add}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default MyAddress;
