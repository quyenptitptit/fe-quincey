import React, { useState, useEffect } from "react";
import "./AddressItem.css";
import { loadingState } from "../../recoil/LoadingState";
import { useSetRecoilState } from "recoil";

function AddressItem(props) {
  const { address, isDelete, setIsDelete, user, hideIcon, style } = props;
  const { name, phonenumber, specificaddress, ward, district, city } = address;
  const [listAdd, setListAdd] = useState(user?.address || []);
  const setLoading = useSetRecoilState(loadingState);

  const handleDelete = () => {
    setLoading(true);
    // setListAdd(listAdd.filter((add) => add._id !== address._id))
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        ["address"]: listAdd.filter((add) => add._id != address._id),
      })
    );
    setIsDelete(!isDelete);
    setLoading(false);
  };

  useEffect(() => {
    setListAdd(user?.address);
  }, [user]);

  return (
    <div className="address-item" style={style}>
      <div className="address-item-info">
        <div style={{ display: "flex" }}>
          <p className="address-item-name">{name}</p>
          <p>{phonenumber}</p>
        </div>
        <p>{specificaddress}</p>
        <p>{`${ward}, ${district}, ${city}`}</p>
      </div>
      {!hideIcon && (
        <div className="address-item-option">
          <button className="address-item-btn" onClick={() => handleDelete()}>
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default AddressItem;
