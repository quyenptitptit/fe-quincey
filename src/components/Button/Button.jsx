import React from "react";
import "./Button.css";

function Button(props) {
  const { onClick, name, style } = props;
  return (
    <button className="button" onClick={onClick} style={style}>
      {name}
    </button>
  );
}

export default Button;
