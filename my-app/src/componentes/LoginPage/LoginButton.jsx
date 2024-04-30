import React from "react";
import "../../estilos/LoginButton.css";

const LoginButton = ({ texto, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (texto === "Log in") {
      
      window.location.href = "/UserPage";
    } else if (texto === "Create Account") {
      
      window.location.href = "/SignUpPage"; 
    }
  };

  return (
    <button type="submit" className="loginButton" onClick={handleClick}>
      {texto}
    </button>
  );
};

export default LoginButton;
