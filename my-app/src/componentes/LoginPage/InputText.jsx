import React from "react";
import "../../estilos/InputText.css";

const InputText = ({ texto, value, onChange, type }) => {
  return (
    <input
      type={type}
      id="inputTextUser"
      placeholder={texto}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputText;
