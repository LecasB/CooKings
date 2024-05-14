import React, { useState } from 'react';
import "../../estilos/TopNavBar.css";
import Logo from "../../imagens/cooKingsImagev1.png";
import Hamburguer from "./Hamburguer";
import PopUp from "./PopUp";

const TopNavBar = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const togglePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  return (
    <div className="topnavbar">
      <div>
        <img src={Logo} alt="logo" srcSet="" />
      </div>
      <div>
        <Hamburguer onClick={togglePopUp} />
        {isPopUpOpen && <PopUp onClose={closePopUp} />}
      </div>
      <select name="" id="">
        <option value="Admin" selected>
          Admin
        </option>
      </select>
    </div>
  );
};

export default TopNavBar;
