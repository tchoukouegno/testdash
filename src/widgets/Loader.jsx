import React from "react";
import "../styles/index.css";

export function Loader  ({ text = "Chargement..." }) {
  return (
    <div className="custom-loader-wrapper">
      <div className="custom-loader"></div>
      <p className="custom-loader-text">{text}</p>
    </div>
  );
};


