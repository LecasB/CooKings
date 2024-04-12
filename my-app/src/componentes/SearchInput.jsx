import React from "react";
import icon from "../imagens/magnifyingglass.png";
import "../estilos/SearchInput.css";

export const SearchInput = () => {
  return (
    <div className="search-input-div">
      <div className="search-input-div-img">
        <img src={icon} alt="" />
      </div>
      <input type="text" placeholder="Search" />
    </div>
  );
};
