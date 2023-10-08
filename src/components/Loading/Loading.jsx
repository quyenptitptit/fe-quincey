import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";
import { loadingState } from "../../recoil/LoadingState";
import { useRecoilValue } from "recoil";

function Loading() {
  const loading = useRecoilValue(loadingState);
  return (
    <div className="loading" style={loading ? {display: "flex"} : {display: "none"}}>
      <div className="loading-item">
        <ReactLoading type="spin" />
      </div>
    </div>
  );
}

export default Loading;
