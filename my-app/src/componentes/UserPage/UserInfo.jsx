import React from "react";
import "../../estilos/UserLateral.css";
import { Profile } from "../../imagens/svgs";

const UserInfo = () => {
  const OpUser = ["Food"];

  return (
    <div className="UserInfo">
      <section className="">
        <figure className="">
          <Profile />
        </figure>

        <label htmlFor="">
          <input type="text" name="Nome" id="" />
        </label>
        <label htmlFor="">
          <input type="email" name="Email" id="" />
        </label>
        <button type="button">Change Password</button>
        <select name="Categories" id="">
          <option value="" selected disabled hidden>
            Choose here
          </option>
          <option value="Chinese">Chinese Food</option>
          <option value="Spicy">Spicy</option>
          <option value="Vegan">Vegan</option>
        </select>
        <div className="user-options-section">
          {OpUser.map((op, index) => {
            return (
              <div className="user-options">
                <p>{op}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default UserInfo;
