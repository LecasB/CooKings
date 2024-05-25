import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";
import "./NovoIngrediente.css"

const NovaReceita = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [idcategory, setCategoryId] = useState(1); 
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imageSalva, setImageSalva] = useState(false);
  const [categories, setCategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Function to fetch categories from Supabase
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("Category_Recipes")
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
    inserImg();

    if (imageSalva) {
      try {
        const { data: insertedData, error } = await supabase
          .from("Recipes")
          .insert([
            {
              name,
              idcategory,
              description,
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

        
      } catch (error) {
        console.error("Error inserting data:", error.message);
      }
    }
  };

  return (
    <div id="novaReceita">
      <h1>Nova Receita</h1>
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

      {submitted && <Link to="/AdminDashboardPage/" />}
    </div>
  );
};

export default NovaReceita;
