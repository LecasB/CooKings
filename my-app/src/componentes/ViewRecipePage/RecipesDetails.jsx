import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import FavoriteButton from "../SearchPage/FavoriteButton";

const RecipeDetails = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idcategory, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [idTagRecipe, setIdTagRecipe] = useState([]);
  const [ingsName, setIngsName] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [ingredientAvailability, setIngredientAvailability] = useState({}); // Estado para rastrear a disponibilidade dos ingredientes

  const url = window.location.href;
  const regex = /(?<=\?=)\d+/;
  const match = url.match(regex);
  const idrecipe = match ? match[0] : null;

  const fetchRecipeData = async () => {
    try {
      const { data, error } = await supabase
        .from("Recipes")
        .select("*")
        .eq("idrecipe", idrecipe)
        .single();
      if (error) {
        throw error;
      }
      setName(data.name);
      setDescription(data.description);
      setCategoryId(data.idcategory);
      setImageUrl(data.image);
      setIdTagRecipe(data.idtags || []);
      fetchIngredients(data.ingridients);
    } catch (error) {
      console.error("Error fetching recipe data:", error.message);
    }
  };

  const fetchIngredients = async (ingredientIds) => {
    try {
      const { data, error } = await supabase
        .from("Ingredients")
        .select()
        .in("idingridients", ingredientIds);

      if (error) {
        throw error;
      }

      setIngsName(data);
      checkIngredientAvailability(data.map(ing => ing.idingridients));
    } catch (error) {
      console.error("Error fetching ingredients data:", error.message);
    }
  };

  const checkIngredientAvailability = async (ingredientIds) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.warn("user +" , user.id);
      if (user) {
        const { data, error } = await supabase
          .from("Product_User")
          .select()
          .eq("iduser", user.id)
          .in("idIng", ingredientIds);

        if (error) {
          throw error;
        }

        console.warn(data);

        // Mapeia a disponibilidade dos ingredientes
        const availabilityMap = {};
        ingredientIds.forEach(id => {
          availabilityMap[id] = data.some(product => product.idIng === id);
        });
        setIngredientAvailability(availabilityMap);
      }
    } catch (error) {
      console.error("Error checking ingredient availability:", error.message);
    }
  };

  const fetchTags = async () => {
    try {
      const { data, error } = await supabase
        .from("Tags")
        .select("*")
        .in("idTag", idTagRecipe);

      if (error) {
        throw error;
      }

      setAllTags(data);
    } catch (error) {
      console.error("Error fetching tags data:", error.message);
    }
  };

  const handleSvgClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    fetchTags();
  }, [idTagRecipe]);

  useEffect(() => {
    fetchRecipeData();
  }, []);


  return (
    <div className="Recipe">
      <figure>
        <img src={imageUrl} alt="" />
      </figure>
      <div className="Detalhes">
        <FavoriteButton onClick={handleSvgClick} isClicked={isClicked} />
        <h2>{name}</h2>
        <div>
          <h3>Tags</h3>
          <ul className="TagList">
            {allTags.map(tags => (
              <li key={tags.id}>{tags.tag}</li>
            ))}
          </ul>
        </div>
        <p>{description}</p>
        <h3>Ingredients</h3>
        <ol className="IngredientList">
          {ingsName.map(ing => {
      const isIngredientAvailable = ingredientAvailability[ing.idingridients];
      return (
        <li key={ing.id} style={{ backgroundColor: isIngredientAvailable ? "green" : "red" }}>
          {ing.name}
        </li>
      );
    })}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetails;
