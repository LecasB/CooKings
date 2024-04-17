import React from "react";
import "../../estilos/LoginButton.css";

const LoginButton = ({ texto }) => {
  return (
    <button onClick={() => console.log("oi")} id="loginButton">
      {texto}
    </button>
  );
};

export default LoginButton;
