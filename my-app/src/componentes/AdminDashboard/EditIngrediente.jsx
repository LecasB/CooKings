import React, { useRef, useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";
import { BackArrow } from "../../imagens/svgs";

const NovoIngrediente = () => {

  const fileInputRef = useRef();
  const imageRef = useRef();

  // State variables for form data and image handling
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idcategory, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // Fetch categories from Supabase
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("Category_Ingredients").select("*");
      if (error) {
        throw error;
      }
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  // Fetch ingredient data if editing
  const fetchIngredientData = async () => {
    try {
      const { data, error } = await supabase
        .from("Ingredients")
        .select("*")
        .eq("idingridients", idingridients)
        .single();
      if (error) {
        throw error;
      }
      setName(data.name);
      setDescription(data.description);
      setCategoryId(data.idcategory);
      setImageUrl(data.image_url); // Set image URL if exists
    } catch (error) {
      console.error("Error fetching ingredient data:", error.message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrlInDatabase = imageUrl;
      
      // Upload image if a new image is selected
      if (imageFile) {
        const { data, error } = await supabase.storage
          .from("cooKingsBucket")
          .upload(`${imageFile.name}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });
        if (error) {
          throw error;
        }
        imageUrlInDatabase = data.Location;
      }

      // Insert or update ingredient data
      if (idingridients) {
        const { error } = await supabase
          .from("Ingredients")
          .update({ name, description, idcategory, image: `https://bdoacldjlizmqmadvijc.supabase.co/storage/v1/object/public/cooKingsBucket/${imageUrlInDatabase}` })
          .eq("idingridients", idingridients);
        if (error) {
          throw error;
        }
      } else {
        const { error } = await supabase
          .from("Ingredients")
          .insert([
            {
              name,
              description,
              idcategory,
              image_url: imageUrlInDatabase,
            },
          ]);
        if (error) {
          throw error;
        }
      }

      window.location.href = "/AdminDashboardPage";
    } catch (error) {
      console.error("Error inserting/updating data:", error.message);
    }
  };

  // Handle drag and drop for image
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length) {
      setImageFile(files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Handle drag over for image drop area
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Handle file input change for image
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length) {
      setImageFile(files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Extracting the ID parameter from the URL
  const url = window.location.href;
  const match = url.match(/[?&]id=(\d+)/);
  const idingridients = match ? match[1] : null;

  useEffect(() => {
    fetchCategories();
    if (idingridients) {
      fetchIngredientData();
    }
  }, [idingridients]);

  return (
    <>
      <main className="EditRecipePage">
        <form className="EditForm" onSubmit={handleSubmit}>
          <div className="LeftForm">
            <div>
              <button className="BackEditRecipe">
                <BackArrow />
                <span>Back</span>
              </button>
            </div>
            <label htmlFor="">Recipe Name</label>
            <input
              type="text"
              placeholder="Type here..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Type here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <label htmlFor="">Category</label>
            <select
              name=""
              id=""
              value={idcategory}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map((categ) => (
                <option key={categ.idcategory} value={categ.idcategory}>
                  {categ.name}
                </option>
              ))}
            </select>
            <label htmlFor="">Tag</label>
            <textarea
              name=""
              id="TagsArea"
              cols="30"
              rows="10"
              placeholder="Add tag"
            ></textarea>
          </div>

          <div className="RightForm">
            <div>
              <img
                ref={imageRef}
                id="RecipeImage"
                src={imageUrl || "https://images.alphacoders.com/276/276861.jpg"}
                alt="Recipe Image"
              />
            </div>
            <label>Product Gallery</label>
            <label
              htmlFor="fileInput"
              id="PutImage"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
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
              <button type="submit" id="saveButton" className="button">SAVE</button>
              <button id="deleteButton" className="button">DELETE</button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default NovoIngrediente;
