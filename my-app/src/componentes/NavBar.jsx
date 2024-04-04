import React from "react";
import "../estilos/NavBar.css";

const NavBar = ({}) => {
  return (
    <div className="navBar">
      <div className="logoContainer">
        <img src="../imagens/cooKingsImage.png" alt="CooKings Logo" />
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
