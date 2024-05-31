import React from "react";
import "../estilos/Footer.css";
import {Twitter, Instagram, Github, LinkedIn} from "../imagens/svgs";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="contentorNome">
        <p>@CooKings--2024</p>
      </div>
      <div className="contentorRedesSocias">
        <ul>
          <li><Twitter/></li>
          <li><Instagram/></li>
          <li><Github/></li>
          <li><LinkedIn/></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
