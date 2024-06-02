import React, { useState, useEffect } from "react";
import "../../estilos/EditRecipePage.css";
import TagsArea from "../TagsArea";
import supabase from "../../supabaseClient";

const EditRecipePage = ({
  name,
  setName,
  description,
  setDescription,
  idcategory,
  setCategoryId,
  categories,
  imageFile,
  setImageFile,
  imageUrl,
  setImageUrl,
  fileInputRef,
  imageRef,
  handleSubmit,
  handleFileChange,
  handleDrop,
  handleDragOver,
  tag,
  setTag,
  selectedIngredients,
  setSelectedIngredients,
}) => {
  const [availableIngredients, setAvailableIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const { data: ingredients, error } = await supabase.from("Ingredients").select("*");
        if (error) {
          throw error;
        }
        setAvailableIngredients(ingredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error.message);
      }
    };
    fetchIngredients();
  }, []);

  const handleIngredientSelect = (index, value) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients[index] = value;
    setSelectedIngredients(updatedIngredients);
  };

  const addSelectBox = () => {
    setSelectedIngredients([...selectedIngredients, ""]);
  };

  return (
    <main className="EditRecipePage">
      <form className="EditForm" onSubmit={handleSubmit}>
        <div className="LeftForm">
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            id="recipeName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            cols="30"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={idcategory}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {(categories ?? []).map((categ) => (
              <option key={categ.idcategory} value={categ.idcategory}>
                {categ.name}
              </option>
            ))}
          </select>
          <label htmlFor="tags">Tag</label>
          <TagsArea tag={tag} setTag={setTag} />

          {selectedIngredients.map((value, index) => (
            <div key={index}>
              <label>Ingredient {index + 1}:</label>
              <select
                value={value}
                onChange={(e) => handleIngredientSelect(index, e.target.value)}
                required
              >
                <option value="">Select Ingredient</option>
                {availableIngredients.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.name}>
                    {ingredient.name}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button type="button" onClick={addSelectBox}>
            Add Ingredient
          </button>
        </div>

        <div className="RightForm">
          <div>
            <img
              ref={imageRef}
              id="RecipeImage"
              src={imageUrl || "https://images.alphacoders.com/276/276861.jpg"}
              alt="Recipe"
            />
          </div>
          <label htmlFor="fileInput">Product Gallery</label>
          <label id="PutImage" onDrop={handleDrop} onDragOver={handleDragOver}>
            <span id="DropImageTitle">Drop your image here, or browse</span>
            <div>
              <input
                ref={fileInputRef}
                id="fileInput"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleFileChange}
              />
            </div>
          </label>
          <div className="buttonContainer">
            <button id="saveButton" className="button" type="submit">
              SAVE
            </button>
            <button id="deleteButton" className="button" type="button">
              CANCEL
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default EditRecipePage;
