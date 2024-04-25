import React from "react";
import SearchForm from "./SearchForm";
import CardProcurar from "../CardProcurar";
import NavBar from "../NavBar";
import "../../estilos/SearchPage.css";

const SearchPage = () => {
  return (
    <>
      <main>
        <h1>Let's search for recipes</h1>
        <div style={{ display: "flex" }}>
          <SearchForm />
          <div className="card-section">
            <CardProcurar titulo={"Titilo 4"} texto={"texto 4"} />
            <CardProcurar titulo={"Titilo 5"} texto={"texto 5"} />
            <CardProcurar titulo={"Titilo 6"} texto={"texto 6"} />
            <CardProcurar titulo={"Titilo 5"} texto={"texto 5"} />
            <CardProcurar titulo={"Titilo 6"} texto={"texto 6"} />
            <CardProcurar titulo={"Titilo 4"} texto={"texto 4"} />
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchPage;
