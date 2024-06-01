import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import FavoriteButton from "../SearchPage/FavoriteButton";

const RecipeDetails = (data) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idcategory, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [idTagRecipe, setIdTagRecipe] = useState([]);

  const [allTags, setAllTags] = useState([]);

  const url = window.location.href;

  const [isClicked, setIsClicked] = useState(false);

  const regex = /(?<=\?=)\d+/;
  const match = url.match(regex);
  const idrecipe = match ? match[0] : null;

  const fetchIngredientData = async () => {
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
      //alert(data.idtags);
      //alert("idtags:" + idTagRecipe);
      console.log(data.image);
      console.log(imageUrl);
      // debugger;
    } catch (error) {
      console.error("Error fetching ingredient data:", error.message);
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
    fetchIngredientData();
  }, []);

  return (
    <div class="Recipe">
      <figure>
        <img src={imageUrl} alt="" />
      </figure>
      <div className="Detalhes">
        <FavoriteButton />
        <h2>{name}</h2>
        <div>
          <h3>Tags</h3>
          <ul className="TagList">
            {allTags.map((tags) => (
              <li>{tags.tag}</li>
            ))}
          </ul>
        </div>
        <p>{description}</p>
        <h3>Ingredients</h3>
        <ol className="IngredientList">
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetails;
