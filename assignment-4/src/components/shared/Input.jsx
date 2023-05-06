import React from "react";

const Input = ({ label, HTMLfor, ...rest }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={HTMLfor}>{label}</label>
      <input required className="text-input" {...rest} />
    </div>
  );
};

export default Input;
