import React, { useState } from "react";
import "./Popup.css";
import productService from "../../services/ProductService";
import { loadingState } from "../../recoil/LoadingState";
import { useSetRecoilState, useRecoilState } from "recoil";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";
import { popupState, popupReload } from "../../recoil/PopupState";

function Popup(props) {
  const [popup, setPopup] = useRecoilState(popupState);
  const [isReload, setIsReload] = useRecoilState(popupReload)
  const setLoading = useSetRecoilState(loadingState);
  const setType = useSetRecoilState(toastType);
  const setTxt = useSetRecoilState(toastTxt);
  const setState = useSetRecoilState(toastState);

  const settingToastMess = (type, txt) => {
    setState(true);
    setTxt(txt);
    setType(type);
  };

  const handleClose = () => {
    setPopup({status: false})
  };

  const handleDelete = async () => {
    setLoading(true);
    const res = await productService.deleteProduct(popup?.id);
    if (res?.message) {
      settingToastMess("success", res?.message);
    }
    else {
      settingToastMess("error", res?.data?.error);
    }
    setPopup({status: false}) // delete successful -> hide popup
    setIsReload(!isReload) // change state to reload data
    setLoading(false);
  };
  
  return (
    <div
      className="pop-up"
      style={popup?.status ? { display: "flex" } : { display: "none" }}
    >
      <div className="p-pop-up">
        <div class="popup-main">
          <div class="popup-title" style={{ fontWeight: "bold" }}>
            Delete product information
          </div>
          <div class="popup-content">
            <i
              class="fas fa-exclamation-triangle"
              style={{ color: "var(--error-color)" }}
            ></i>
            <p id="textPopup">
              Are you sure want to delete this product information?
            </p>
          </div>
        </div>
        <div class="popup-footer">
          <button
            class="btn btn-cancel"
            id="btnCancelPopup"
            style={{ marginRight: "16px" }}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button class="btn btn-delete" id="btnDelete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
