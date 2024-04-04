import React from "react";
import cooKingsImage from "../imagens/cooKingsImage.png"; // Importe a imagem
import "../estilos/NavBar.css";

const NavBar = ({}) => {
  return (
    <nav className="navBar">
      <div className="logoContainer">
        <img src={cooKingsImage} alt="CooKings Logo"></img>{" "}
        {/* Use a variável importada */}
      </div>
      <div>
        <ul className="linksContainer">
          <li className="linksItems">
            <p>teste</p>
          </li>
          <li className="linksItems">
            <p>teste</p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
