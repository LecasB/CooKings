import React from "react";
import "../../estilos/IndexPage.css";

import chefimage from "../../imagens/cozinhaste.png";

import BoasText from "./BoasText";
import NavBar from "../NavBar";
import RecipeSearch from "./RecipeSearch";
import ListaCard from "../ListaCards";
import recipe from "../ArrayInfo";
import { UserPossibility } from "./UserPossibility";
import recipelogo from "../../imagens/recipe-icon.png";

const IndexPage = () => {
  return (
    <>
      {/* <header>
        <NavBar />
      </header> */}
      <main>
        <div className="IndexPage">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BoasText />
            <figure>
              <img src={chefimage} alt="" srcset="" />
            </figure>
          </div>
        </div>
        <div className="boxcard">
          <UserPossibility logo={recipelogo} texto={"Creative Recipes!"} />
          <UserPossibility logo={recipelogo} texto={"Creative Recipes!"} />
          <UserPossibility logo={recipelogo} texto={"Creative Recipes!"} />
        </div>
        <div>
          <RecipeSearch />
        </div>
        <div className="box">
          <h2>Recommended for you</h2>
          <div className="boxcard">
            <ListaCard dados={recipe} />
          </div>
        </div>

        <div className="box">
          <h2>Recommended for you</h2>
          <div className="boxcard">
            <ListaCard dados={recipe} />
          </div>
        </div>
      </main>
    </>
  );
};

export default IndexPage;
