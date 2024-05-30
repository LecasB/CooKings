import React, { useState, useEffect } from "react";
import "../../estilos/UserLateral.css";
import { Profile } from "../../imagens/svgs";
import supabase from "../../supabaseClient";
import TagsArea from "../TagsArea";


const UserInfo = () => {
  const [ops, setOps] = useState([]);

  const getCategories = async () => {

    try {
      // Fetch data from Supabase
      const { data: fetchedData, error } = await supabase
        .from("Tags")
        .select();

      if (error) {
        throw error;
      }

      // Set fetched data to state
      
      setOps(fetchedData);
      
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }

  } 
  const [escolhas, setEscolhas] = useState([]);

  const handleSelect = (value) => {
    setEscolhas([...escolhas, value]);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="UserInfo">
      <section className="Perfil">
        <figure className="foto">
          <Profile />
        </figure>

        <input className="inputsProfile" type="text" name="Nome" id="" placeholder="Name" />

        <input className="inputsProfile" type="email" name="Email" id="" placeholder="Email" />

        <button className="inputsProfile" type="button">Change Password</button>

        <TagsArea />

        <div className="user-options-section">
          {escolhas.map((op, index) => (
            <div className="user-options">
              <p> {op} </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserInfo;
