import React from "react";
import "./ToastMess.css";
import { useRecoilValue, useRecoilState } from "recoil";
import { toastState, toastTxt, toastType } from "../../recoil/ToastMessState";

function ToastMess() {
  const type = useRecoilValue(toastType);
  const txt = useRecoilValue(toastTxt);
  const [state, setState] = useRecoilState(toastState);

  setTimeout(() => {
    setState(false);
  }, 2000);

  return (
    <div
      class="toast-box"
      style={state ? { display: "flex" } : { display: "none" }}
    >
      <div class={`toast-item toast-item-${type}`}>
        <div class="toast-icon">
          {type == "error" && <i class="fas fa-exclamation-triangle"></i>}
          {type == "warning" && <i class="fas fa-exclamation-circle"></i>}
          {type == "success" && <i class="fas fa-check-circle"></i>}
          {type == "info" && <i class="fas fa-info-circle"></i>}
        </div>
        <div class="toast-text">{txt}</div>
        {/* <div class="toast-close">
          <i class="fas fa-times"></i>
        </div> */}
      </div>
    </div>
  );
}

export default ToastMess;
