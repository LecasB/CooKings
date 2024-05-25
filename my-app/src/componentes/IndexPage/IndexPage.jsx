import React from "react";
import { useEffect, useState } from "react";
import "../../estilos/IndexPage.css";
import chefimage from "../../imagens/cozinhaste.png";
import BoasText from "./BoasText";
import NavBar from "../NavBar";
import RecipeSearch from "./RecipeSearch";
import ListaCard from "../ListaCards";
import recipe from "../ArrayInfo";
import { UserPossibility } from "./UserPossibility";
import recipelogo from "../../imagens/recipe-icon.png";
import supabase from "../../supabaseClient";

const IndexPage = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUsername(user.user_metadata.username);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

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
            <BoasText nome={username} />
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
