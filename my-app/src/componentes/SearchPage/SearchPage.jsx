import React from "react";
import SearchForm from "./SearchForm";
import CardProcurar from "../CardProcurar";
import NavBar from "../NavBar";
import ListaCards from "./ListaCards";
import supabase from "../../supabaseClient";
import "../../estilos/SearchPage.css";

const SearchPage = () => {
  return (
    <>
      <main>
        <h1>Let's search for recipes</h1>
        <div style={{ display: "flex" }}>
          <SearchForm />
          <ListaCards />
        </div>
      </main>
    </>
  );
};

export default SearchPage;
