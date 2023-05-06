import React from "react";

const Input = ({ id, label, ...rest }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id}>{label}</label>
      <input className="addProductInput" id={id} {...rest} required />
    </div>
  );
};

export default Input;
