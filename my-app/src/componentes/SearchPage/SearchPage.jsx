import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import CardProcurar from "../CardProcurar";
import NavBar from "../NavBar";
import ListaCards from "./ListaCards";
import supabase from "../../supabaseClient";
import "../../estilos/SearchPage.css";

const SearchPage = () => {
  const [categoriasUser, setCategoriasUser] = useState([]);
  const [tagsUser, setTagsUser] = useState([]);
  const [value, setValue] = useState("");

  const verificarLocalStorage = () => {
    if (localStorage.getItem("valueIndexPage")) {
      setValue(localStorage.getItem("valueIndexPage"));
    }
  };

  useEffect(() => {
    verificarLocalStorage();
  }, []);

  return (
    <>
      <main>
        <h1>Let's search for recipes</h1>
        <div className="search-page">
          <SearchForm
            categoriasUser={categoriasUser}
            setCategoriasUser={setCategoriasUser}
            tagsUser={tagsUser}
            setTagsUser={setTagsUser}
            inputValue={value}
            setInputValue={setValue}
          />
          <ListaCards
            categoriasUser={categoriasUser}
            tagsUser={tagsUser}
            inputValue={value}
          />
        </div>
      </main>
    </>
  );
};

export default SearchPage;
