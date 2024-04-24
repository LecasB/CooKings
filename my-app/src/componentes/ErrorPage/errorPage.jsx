import React from "react";
import Logo from "../../imagens/404.png";
import "./errorPage.css";

const errorPage = () => {
  return (
    <div id="errorPage">
      <img src={Logo}></img>
      <h1>It looks like they're is no recipes here 😕</h1>
    </div>
  );
};

export default errorPage;
