import React from "react";
import "../../estilos/SearchForm.css";

const SearchForm = () => {
  return (
    <div className="searchform">
      <div>
        <input
          type="text"
          className="searchinput"
          name=""
          id=""
          placeholder="Search"
        />
      </div>
      <div>
        <hr />
      </div>
      <div className="item-container">
        <input type="checkbox" name="diner" id="diner" />
        <label for="diner">Diner</label>
      </div>
      <div className="item-container">
        <input type="checkbox" name="dessert" id="dessert" />
        <label for="dessert">Dessert</label>
      </div>
      <div>
        <hr />
      </div>
      <div className="ingredients-list">
        <div className="item-container">
          <input type="checkbox" name="ing1" id="ing1" />
          <label for="ing1">Ing1</label>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
