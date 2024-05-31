import React, { useEffect, useState } from "react";
import icon from "../imagens/magnifyingglass.png";
import "../estilos/SearchInput.css";
import { useNavigate } from "react-router-dom";

export const SearchInput = ({ inputValue, setInputValue }) => {
  //const [value, setValue] = useState("");
  let navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    localStorage.setItem("valueIndexPage", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/SearchPage");
  };

  return (
    <div className="search-input-div">
      <div className="search-input-div-img">
        <img src={icon} alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
          value={inputValue || ""}
        />
      </form>
    </div>
  );
};

export default SearchInput;
