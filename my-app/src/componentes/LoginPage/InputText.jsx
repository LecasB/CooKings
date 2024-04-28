import React, { useState } from "react";
import "../../estilos/InputText.css";

const InputText = ({ texto }) => {
  const [value, setValue] = useState(""); 

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <input
      type="text"
      id="inputTextUser"
      placeholder={texto}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputText;

