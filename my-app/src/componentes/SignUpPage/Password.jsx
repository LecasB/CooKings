import React from "react";
import "../../estilos/InputText.css";

const Password = ({ texto, value, onChange }) => {
  return (
    <input
      type="password"
      id="inputTextUser"
      value={value}
      placeholder={texto}
      onChange={onChange}
    />
  );
};

export default Password;
