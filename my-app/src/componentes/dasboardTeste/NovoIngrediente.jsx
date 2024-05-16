import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
<<<<<<< HEAD
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
=======
import { Link } from "react-router-dom";
>>>>>>> origin/luish

const NovoIngrediente = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idcategory, setCategoryId] = useState("2");
<<<<<<< HEAD
  const [image, setImage] = useState(null); // State to hold image data
=======
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imageSalva, setImageSalva] = useState(false);

>>>>>>> origin/luish
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

  const inserImg = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("cooKingsBucket")
        .upload(image.name, image);

      if (data) {
        // saber se colocou a img para inserir o restos na bd
        setImageSalva(true);
      }
    } catch (error) {
      console.log(error);
      setImageSalva(false);
    }
  };

  useEffect(() => {
    setImageSalva(true);
  }, [imageSalva]);

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    try {
      // Insert data into the "Ingredients" table
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

      // Reset form fields after successful submission
      setName("");
      setDescription("");
      setCategoryId("");
      setImage(null);
    } catch (error) {
      console.error("Error inserting data:", error.message);
=======
    inserImg();

    if (imageSalva) {
      try {
        const { data: insertedData, error } = await supabase
          .from("Ingredients")
          .insert([
            {
              name,
              description,
              idcategory,
              image:
                "https://bdoacldjlizmqmadvijc.supabase.co/storage/v1/object/public/cooKingsBucket/" +
                image.name,
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
>>>>>>> origin/luish
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
