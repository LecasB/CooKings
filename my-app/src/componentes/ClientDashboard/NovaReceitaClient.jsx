import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabaseClient";
import "../../estilos/EditRecipePage.css";
import EditRecipePage from "../EditRecipePage/EditRecipePage";

const NovaReceitaClient = () => {
  const fileInputRef = useRef();
  const imageRef = useRef();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idcategory, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [userId, setUserId] = useState(null);
  const [tag, setTag] = useState([]);

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

  async function getUser() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error fetching user session:", error.message);
      return;
    }
    if (data.session) {
      setUserId(data.session.user.id);
    }
  }

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
      setImageUrl(data.image);
    } catch (error) {
      console.error("Error fetching ingredient data:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, "0");
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
    const ano = dataAtual.getFullYear();
    const horas = String(dataAtual.getHours()).padStart(2, "0");
    const minutos = String(dataAtual.getMinutes()).padStart(2, "0");
    const segundos = String(dataAtual.getSeconds()).padStart(2, "0");
    const dataHoraFormatada = dia + mes + ano + horas + minutos + segundos;
    try {
      let imageUrlInDatabase = imageUrl;
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
        imageUrlInDatabase = data.path;
      }
      const ingredientData = {
        name,
        description,
        idcategory,
        image: `https://bdoacldjlizmqmadvijc.supabase.co/storage/v1/object/public/cooKingsBucket/${imageUrlInDatabase}`,
        iduser: userId,
        state: false,
        idtags: tag,
      };
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

  const handleDragOver = (event) => {
    event.preventDefault();
  };

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

  const url = window.location.href;
  const match = url.match(/[?&]id=(\d+)/);
  const idingridients = match ? match[1] : null;

  useEffect(() => {
    getUser();
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

export default NovaReceitaClient;
