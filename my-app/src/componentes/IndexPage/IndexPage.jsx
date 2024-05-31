import React from "react";
import { useEffect, useState } from "react";
import "../../estilos/IndexPage.css";
import chefimage from "../../imagens/cozinhaste.png";
import BoasText from "./BoasText";
import NavBar from "../NavBar";
import RecipeSearch from "./RecipeSearch";
import ListaCard from "../ListaCards";
import { UserPossibility } from "./UserPossibility";
import recipelogo from "../../imagens/recipe-icon.png";
import supabase from "../../supabaseClient";

const IndexPage = () => {
  const [username, setUsername] = useState("");
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const { data: allIds, error: allIdsError } = await supabase
          .from("Recipes")
          .select("idrecipe");

        if (allIdsError) {
          console.error("Error fetching all ids:", allIdsError);
          return;
        }

        if (!allIds || allIds.length === 0) {
          console.error("No recipe ids found");
          return;
        }

        // Shuffle the ids and select the first 3
        const shuffledIds = allIds.sort(() => 0.5 - Math.random()).slice(0, 3);

        const recipePromises = shuffledIds.map(async (row) => {
          const { data: recipe, error: recipeError } = await supabase
            .from("Recipes")
            .select("*")
            .eq("idrecipe", row.idrecipe)
            .single();

          if (recipeError) {
            console.error("Error fetching recipe:", recipeError);
            return null;
          }

          return recipe;
        });

        const recipes = await Promise.all(recipePromises);
        setRecommendedRecipes(recipes.filter((recipe) => recipe !== null));
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchRandomRecipes();
  }, []);

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
      <main>
        <div className="IndexPage">
          <div id="indexBanner">
            <BoasText nome={username} />
            <figure>
              <img src={chefimage} alt="" />
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
            <ListaCard dados={recommendedRecipes} />
          </div>
        </div>

        <div className="box">
          <h2>Based on your preferences</h2>
          <div className="boxcard">
            <ListaCard dados={recommendedRecipes} />
          </div>
        </div>
      </main>
    </>
  );
};

export default IndexPage;
