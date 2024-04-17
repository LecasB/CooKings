import React from "react";
import "../../estilos/RecipeSearch.css";
import { SearchInput } from "../SearchInput";

const RecipeSearch = () => {
  return (
    <div className="recipe-search">
      <h2>Search your Ideal recipe here! :)</h2>
      <div className="recipe-search-cont">
        <SearchInput />
      </div>
    </div>
  );
};

export default RecipeSearch;
