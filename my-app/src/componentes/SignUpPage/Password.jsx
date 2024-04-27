import React from "react";
import "../../estilos/InputText.css";

const Password = ({ texto }) => {
  return <input type="password" id="inputTextUser" placeholder={texto}></input>;
};

export default Password;
