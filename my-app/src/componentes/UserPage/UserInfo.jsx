import React, { useState } from "react";
import "../../estilos/UserLateral.css";
import { Profile } from "../../imagens/svgs";
import SelectCategories from "./SelectCategories";

const UserInfo = () => {
  const [ops, setOps] = useState(["1", "2", "3"]);

  const [escolhas, setEscolhas] = useState([]);

  const handleSelect = (value) => {
    setEscolhas([...escolhas, value]);
  };

  return (
    <div className="UserInfo">
      <section className="Perfil">
        <figure className="">
          <Profile />
        </figure>

        <input type="text" name="Nome" id="" placeholder="Name" />

        <input type="email" name="Email" id="" placeholder="Email" />

        <button type="button">Change Password</button>

        <SelectCategories array1={ops} onSelect={handleSelect} />

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
