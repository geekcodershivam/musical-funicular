import React from "react";
import "../Assets/Loading.css";
const Loading = () => {
  return (
    <div className="ellip-loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
