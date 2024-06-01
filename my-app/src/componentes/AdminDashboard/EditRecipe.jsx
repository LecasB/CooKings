import React, { useRef, useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";
import { BackArrow } from "../../imagens/svgs";
import "../../estilos/EditRecipePage.css";
import EditRecipePage from "../EditRecipePage/EditRecipePage";

const EditRecipe = () => {
  const fileInputRef = useRef();
  const imageRef = useRef();

  // State variables for form data and image handling
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idcategory, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [tag, setTag] = useState([]);

  // Fetch categories from Supabase
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("Category_Recipes")
        .select("*");
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
        .from("Recipes")
        .select("*")
        .eq("idrecipe", idingridients)
        .single();
      if (error) {
        throw error;
      }
      setName(data.name);
      setDescription(data.description);
      setCategoryId(data.idcategory);
      setImageUrl(data.image); // Set image URL if exists
      console.log(data.image);
      console.log(imageUrl);
      // debugger;
    } catch (error) {
      console.error("Error fetching ingredient data:", error.message);
    }
  };

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, "0");
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0"); // getMonth() começa de 0 para janeiro
    const ano = dataAtual.getFullYear();
    const horas = String(dataAtual.getHours()).padStart(2, "0");
    const minutos = String(dataAtual.getMinutes()).padStart(2, "0");
    const segundos = String(dataAtual.getSeconds()).padStart(2, "0");
    const dataHoraFormatada = dia + mes + ano + horas + minutos + segundos;

    try {
      console.log(imageUrl);
      // debugger;
      let imageUrlInDatabase = imageUrl;

      // Upload image if a new image is selected
      if (imageFile) {
        const { data, error } = await supabase.storage
          .from("cooKingsBucket")
          .upload(`${dataHoraFormatada}_${imageFile.name}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
        if (error) {
          throw error;
        }
        console.log("Upload response:", data);
        imageUrlInDatabase = data.path; // L
        console.log(imageUrlInDatabase);
      }

      const ingredientData = {
        name,
        description,
        idcategory,
        image:
          `https://bdoacldjlizmqmadvijc.supabase.co/storage/v1/object/public/cooKingsBucket/` +
          imageUrlInDatabase,
        idtags: tag,
      };

      console.log(
        `https://bdoacldjlizmqmadvijc.supabase.co/storage/v1/object/public/cooKingsBucket/` +
          imageUrlInDatabase
      );

      if (idingridients) {
        await supabase
          .from("Recipes")
          .update(ingredientData)
          .eq("idrecipe", idingridients);
      } else {
        await supabase.from("Recipes").insert([ingredientData]);
      }

      window.location.href = "/AdminDashboardPage/ListaReceitas";
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
      <EditRecipePage
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        idcategory={idcategory}
        setCategoryId={setCategoryId}
        categories={categories}
        setCategories={setCategories}
        imageFile={imageFile}
        setImageFile={setImageFile}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        fileInputRef={fileInputRef}
        imageRef={imageRef}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        tag={tag}
        setTag={setTag}
      />
    </>
  );
};

export default EditRecipe;
