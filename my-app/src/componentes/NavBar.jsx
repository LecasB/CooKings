import React from "react";
import cooKingsImage from "../imagens/cooKingsImage.png"; // Importe a imagem

const NavBar = ({}) => {
  return (
    <div className="navBar">
      <div className="logoContainer">
        <img src={cooKingsImage} alt="CooKings Logo" ></img> {/* Use a variável importada */}
      </div>
      <div>
        <ul className="linksContainer">
          <li className="linksItems">
            {/* <Link to="/storage"><img src="" alt="Storage" /></Link> */}
          </li>
          <li className="linksItems">
            {/* <Link to="/profile"><img src="" alt="Profile" /></Link> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
