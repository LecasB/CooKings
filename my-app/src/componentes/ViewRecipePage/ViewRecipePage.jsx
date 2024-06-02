import React, { useState, useEffect } from "react";
import RecipeDetails from "./RecipesDetails";
import CardProcurar from "../CardProcurar";
import "../../estilos/ViewRecipePage.css";
import supabase from "../../supabaseClient";

const ViewRecipePage = () => {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [user, setUser] = useState();

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
        

        const shuffledIds = allIds.sort(() => 0.5 - Math.random()).slice(0, 4);

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

  const verificarlogin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    console.log("User: ");
    console.warn(user);
  };

  useEffect(() => {
    verificarlogin();
    const handleUrlChange = () => {
      window.location.reload();
    };

    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  return (
    <main>
      <div className="ViewRecipePage">
        <RecipeDetails />

        <div className="Recommended">
          <h3>Recommended Recipes</h3>
          <div className="boxcard">
            {recommendedRecipes.map((recipe) => (
              <CardProcurar
                key={recipe.idrecipe}
                titulo={recipe.name}
                texto={recipe.description}
                image={recipe.image}
                iduser={user ? user : null}
                id={recipe.idrecipe}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewRecipePage;
