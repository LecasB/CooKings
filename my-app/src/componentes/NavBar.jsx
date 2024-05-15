import React, { useEffect, useState } from "react";
import cooKingsImage from "../imagens/cooKingsImagev1.png";
import "../estilos/NavBar.css";
import { Storage, Profile } from "../imagens/svgs.jsx";
import OverlayMenu from "./OverlayMenu.jsx";
import { Link } from "react-router-dom";

const NavBar = () => {
  let mediaQuery = window.matchMedia("(max-width: 1980px)"); //por enquanto deixo sempre ativo para podermos andar pela aplicação
  const [isOpen, setIsOpen] = useState(false);

  const ativarMenu = () => {
    setIsOpen(!isOpen);
  };

  const fecharMenu = () => {
    setIsOpen(false);
  };

  const hamburguer = () => {
    if (mediaQuery.matches) {
      document.getElementById("burger-icon").classList.remove("disabled");
      let linksItems = document.getElementsByClassName("linksItems");
      for (let item of linksItems) {
        item.classList.add("disabled");
      }
    } else {
      document.getElementById("burger-icon").classList.add("disabled");
      let linksItems = document.getElementsByClassName("linksItems");
      for (let item of linksItems) {
        item.classList.remove("disabled");
      }
    }
  };

  useEffect(() => {
    hamburguer();

    if (isOpen) {
      // Desativar o scroll quando o overlay está aberto
      document.body.classList.add("noScroll");
    } else {
      // Reativar o scroll quando o overlay é fechado
      document.body.classList.remove("noScroll");
    }

    // Chama a funcao sempre que a mediaQuery passa mobile size
    mediaQuery.addEventListener("change", hamburguer);

    // Remove o EventListener
    return () => {
      mediaQuery.removeEventListener("change", hamburguer);
    };
  }, [isOpen]);

  return (
    <header>
      {" "}
      <nav className="navBar">
        <div className="logoContainer">
          <Link to="/">
            <img src={cooKingsImage} alt="CooKings Logo" />
          </Link>
        </div>
        <div>
          <ul className="linksContainer">
            <li className="linksItems">
              <Link to="IngredientsListPage/IngredientsListPage">
                <Storage />
              </Link>
            </li>
            <li className="linksItems">
              <Link to="/UserPage">
                <Profile />
              </Link>
            </li>
            <li id="burger-icon" onClick={ativarMenu}>
              <label className={`burger ${isOpen ? "open" : ""}`} for="burger">
                <div className="line"></div>
              </label>
            </li>
          </ul>
        </div>
        <OverlayMenu isOpen={isOpen} onClose={fecharMenu} />
      </nav>
    </header>
  );
};

export default NavBar;
