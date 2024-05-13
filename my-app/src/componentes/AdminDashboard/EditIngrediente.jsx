import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";

const NovoIngrediente = () => {
  // Extracting the ID parameter from the URL
  const url = window.location.href;
  const match = url.match(/[?&]id=(\d+)/);
  const idingridients = match ? match[1] : null;

  // State variables to hold form data and category options
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idcategory, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  // Function to fetch categories from Supabase
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
    } catch (error) {
      console.error("Error fetching ingredient data:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (idingridients) {
      fetchIngredientData();
    }
  }, [idingridients]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      if (idingridients) {
        
        const { error } = await supabase
          .from("Ingredients")
          .update({ name, description, idcategory })
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
            },
          ]);
        if (error) {
          throw error;
        }
      }

      
      window.location.href = "/DashboardTeste";
    } catch (error) {
      console.error("Error inserting/updating data:", error.message);
    }
  };

  return (
    <div>
      <h1>Editar Ingrediente</h1>
      <form onSubmit={handleSubmit}>
        
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />

        
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />

        
        <label>
          Category:
          <select
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
        </label>
        <br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default NovoIngrediente;
