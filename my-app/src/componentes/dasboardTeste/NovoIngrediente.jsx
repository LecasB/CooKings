import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";


const NovoIngrediente = () => {
  // State variables to hold form data and category options
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idcategory, setCategoryId] = useState("");
  const [image, setImage] = useState(null); // State to hold image data
  const [categories, setCategories] = useState([]);

  // Function to fetch categories from Supabase
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("Category_Ingredients").select("*");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Insert data into the "Ingredients" table
      const { data: insertedData, error } = await supabase.from("Ingredients").insert([
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
  
      // Reset form fields after successful submission
      setName("");
      setDescription("");
      setCategoryId("");
      setImage(null);
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  return (
    <div>
      <h1>Novo Ingrediente</h1>
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
            required
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NovoIngrediente;
