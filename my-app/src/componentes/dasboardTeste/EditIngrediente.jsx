import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
  useParams
} from "react-router-dom";

const NovoIngrediente = () => {
    
    const url = window.location.href;
    const match = url.match(/[?&]id=(\d+)/);
    const idingridients = match ? match[1] : null;
    
   // Extracting the ID parameter from the URL

  // State variables to hold form data and category options
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idcategory, setCategoryId] = useState("");
  const [image, setImage] = useState(null); // State to hold image data
  const [categories, setCategories] = useState([]);

  // Function to fetch categories from Supabase
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("Category_Ingredients")
        .select("*");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  // Function to fetch ingredient data based on the ID
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
      // Pre-fill form fields with fetched data
      setName(data.name);
      setDescription(data.description);
      setCategoryId(data.idcategory);
      // You may need to handle image separately if you're storing it in a different way
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
      // Insert or update data into the "Ingredients" table based on whether ID exists
      if (idingridients) {
        // Update data
        const { data: updatedData, error } = await supabase
          .from("Ingredients")
          .update({ name, description, idcategory })
          .eq("idingridients", idingridients);
        if (error) {
          throw error;
        }
        console.log("Data updated successfully:", updatedData);
      } else {
        // Insert new data
        const { data: insertedData, error } = await supabase
          .from("Ingredients")
          .insert([
            {
              name,
              description,
              idcategory,
              image: image, // Storing image data in the database
            },
          ]);
        if (error) {
          throw error;
        }
        console.log("Data inserted successfully:", insertedData);
      }

      // Reset form fields after successful submission
      setName("");
      setDescription("");
      setCategoryId("");
      setImage(null);
    } catch (error) {
      console.error("Error inserting/updating data:", error.message);
    }
  };

  return (
    <div>
      <h1>Editar Ingrediente</h1>
      <form onSubmit={handleSubmit}>
        {/* Name input */}
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

        {/* Description input */}
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

        {/* Category select */}
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

        {/* Image input */}
        <label>
          Image:
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required={!idingridients} // Image is not required for editing
          />
        </label>
        <br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default NovoIngrediente;
