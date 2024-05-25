import React, { useState } from "react";
import "../../estilos/RecipeSearch.css";
import { SearchInput } from "../SearchInput";

const RecipeSearch = () => {
  const [value, setValue] = useState(""); // n vai ser utilizado para nada este

  return (
    <div className="recipe-search">
      <h2>Search your Ideal recipe here! :)</h2>
      <div className="recipe-search-cont">
        <SearchInput inputValue={value} setInputValue={setValue} />
      </div>
    </div>
  );
};

export default RecipeSearch;
