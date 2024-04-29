import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";

const NovoIngrediente = () => {
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idcategory, setCategoryId] = useState("2");
  const [image, setImage] = useState(null); 
  const [categories, setCategories] = useState([]);
  const [submitted, setSubmitted] = useState(false); 

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const { data: insertedData, error } = await supabase
        .from("Ingredients")
        .insert([
          {
            name,
            description,
            idcategory,
            image: image, 
          },
        ]);

      if (error) {
        throw error;
      }

      console.log("Data inserted successfully:", insertedData);

  
      setName("");
      setDescription("");
      setCategoryId("");
      setImage(null);

      
      setSubmitted(true);

      
      window.location.href = "/DashboardTeste";
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  return (
    <div>
      <h1>Novo Ingrediente</h1>
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
            {categories.map((categ) => (
              <option key={categ.idcategory} value={categ.idcategory}>
                {categ.name}
              </option>
            ))}
          </select>
        </label>
        <br />

      
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

   
      {submitted && <Link to="/DashboardTeste" />}
    </div>
  );
};

export default NovoIngrediente;
