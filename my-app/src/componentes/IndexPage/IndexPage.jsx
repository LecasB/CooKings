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
        <div className="boxcard fundoazul">
          <UserPossibility
            logo={
              <svg
                width="239px"
                height="239px"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                stroke="#F9BB2D"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21"
                    stroke=""
                    stroke-width="1.224"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            }
            texto={"Creative Recipes!"}
          />
          <UserPossibility
            logo={
              <svg
                width="239px"
                height="239px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                    stroke="#F9BB2D"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            }
            texto={"Share Your Work!"}
          />
          <UserPossibility
            logo={
              <svg
                width="239px"
                height="239px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M21.609 13.5616L21.8382 11.1263C22.0182 9.2137 22.1082 8.25739 21.781 7.86207C21.604 7.64823 21.3633 7.5172 21.106 7.4946C20.6303 7.45282 20.0329 8.1329 18.8381 9.49307C18.2202 10.1965 17.9113 10.5482 17.5666 10.6027C17.3757 10.6328 17.1811 10.6018 17.0047 10.5131C16.6865 10.3529 16.4743 9.91812 16.0499 9.04851L13.8131 4.46485C13.0112 2.82162 12.6102 2 12 2C11.3898 2 10.9888 2.82162 10.1869 4.46486L7.95007 9.04852C7.5257 9.91812 7.31351 10.3529 6.99526 10.5131C6.81892 10.6018 6.62434 10.6328 6.43337 10.6027C6.08872 10.5482 5.77977 10.1965 5.16187 9.49307C3.96708 8.1329 3.36968 7.45282 2.89399 7.4946C2.63666 7.5172 2.39598 7.64823 2.21899 7.86207C1.8918 8.25739 1.9818 9.2137 2.16181 11.1263L2.391 13.5616C2.76865 17.5742 2.95748 19.5805 4.14009 20.7902C5.32271 22 7.09517 22 10.6401 22H13.3599C16.9048 22 18.6773 22 19.8599 20.7902C21.0425 19.5805 21.2313 17.5742 21.609 13.5616Z"
                    stroke="#F9BB2D"
                    stroke-width="1.5"
                  ></path>{" "}
                </g>
              </svg>
            }
            texto={"Save Your Favourites!"}
          />
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
