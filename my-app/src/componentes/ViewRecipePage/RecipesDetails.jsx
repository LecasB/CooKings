import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";

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
        <svg
          onClick={handleSvgClick}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill={isClicked ? "#FFD43B" : "currentColor"}
            d={
              isClicked
                ? "M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"
                : "M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"
            }
          />
        </svg>
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
        <ul className="IngredientList">
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
          <li>Lorem</li>
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetails;
