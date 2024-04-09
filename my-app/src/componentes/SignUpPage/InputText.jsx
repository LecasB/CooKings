import React from "react";
import "../../estilos/InputText.css";

const InputText = ({texto}) => {
  return <input type="text" id="inputTextUser" placeholder={texto}></input>;
};

export default InputText;
