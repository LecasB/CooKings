import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import CardProcurar from "../CardProcurar";
import NavBar from "../NavBar";
import ListaCards from "./ListaCards";
import supabase from "../../supabaseClient";
import "../../estilos/SearchPage.css";

const SearchPage = () => {
  //limpa sempre q a pagina n está renderizada
  /*  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []); */

  const [categoriasUser, setCategoriasUser] = useState([]);
  const [tagsUser, setTagsUser] = useState([]);

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
          />
          <ListaCards categoriasUser={categoriasUser} tagsUser={tagsUser} />
        </div>
      </main>
    </>
  );
};

export default SearchPage;
