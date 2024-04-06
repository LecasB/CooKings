import React from "react";
import cooKingsImage from "../imagens/cooKingsImagev1.png";
import "../estilos/NavBar.css";
import {Storage, Profile} from "../imagens/svgs.jsx";

const NavBar = () => {
  return (
    <nav className="navBar">
      <div className="logoContainer">
        <img src={cooKingsImage} alt="CooKings Logo" />
      </div>
      <div>
        <ul className="linksContainer">
          <li className="linksItems">
            <Storage/>
          </li>
          <li className="linksItems">
           <Profile/>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
