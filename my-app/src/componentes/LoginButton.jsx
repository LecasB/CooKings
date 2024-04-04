import React from "react";
import "../estilos/LoginButton.css";

const LoginButton = () => {
  return (
    <button onClick={() => console.log("pila")} id="loginButton">
      Log In
    </button>
  );
};

export default LoginButton;
