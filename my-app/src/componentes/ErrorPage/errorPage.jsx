import React from "react";
import Logo from "../../imagens/404.png";
import "./errorPage.css"

const errorPage = () => {
  return (
    <div>
    <img src={Logo}></img> 
    <h1>404</h1>
  </div>
  
  );
};

export default errorPage;