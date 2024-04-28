import React from "react";
import "../../estilos/InputText.css";

const InputText = ({ texto, value, onChange }) => {
  return (
    <input
      type="text"
      id="inputTextUser"
      value={value}
      placeholder={texto}
      onChange={onChange}
    />
  );
};

export default InputText;

