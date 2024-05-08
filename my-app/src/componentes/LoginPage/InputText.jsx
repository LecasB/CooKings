import React from "react";
import "../../estilos/InputText.css";

const InputText = ({ texto, value, onChange }) => {
  return (
    <input
      type="text"
      id="inputTextUser"
      placeholder={texto}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputText;
