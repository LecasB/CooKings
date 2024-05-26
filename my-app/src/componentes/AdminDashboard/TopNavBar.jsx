import "../../estilos/TopNavBar.css";
import Logo from "../../imagens/cooKingsImagev1.png";
import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom";
import OverlayMenu from "./OverlayMenu"

const TopNavBar = () => {

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
    <div className="topnavbar">
      <div>
        <Link to="/">
        <img src={Logo} alt="logo" srcSet="" />
        </Link>
      </div>
      <div id="burger-icon" onClick={ativarMenu}>
            <label className={`burger ${isOpen ? "open" : ""}`} for="burger">
              <div className="line"></div>
            </label>
          </div>
      
      
          <OverlayMenu isOpen={isOpen} onClose={fecharMenu}/>
    </div>
  );
};

export default TopNavBar;
