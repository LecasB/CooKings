import React from "react";
import "../../estilos/LoginButton.css";

const LoginButton = ({ texto, type, onClick }) => {
  return (
    <button type={type} className="loginButton" onClick={onClick}>
      {texto}
    </button>
  );
};

export default LoginButton;
