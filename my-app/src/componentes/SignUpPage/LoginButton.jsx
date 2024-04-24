import React from "react";
import "../../estilos/LoginButton.css";

const LoginButton = ({ texto, onClick }) => {
  return (
    <button type="submit" className="loginButton" onClick={onClick}>
      {texto}
    </button>
  );
};

export default LoginButton;
