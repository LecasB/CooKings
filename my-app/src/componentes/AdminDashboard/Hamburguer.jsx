// Hamburguer.js
import React from 'react';
import "./Hamburguer.css"

const Hamburguer = ({ onClick }) => {
  return (
    <div id="webapp_cover" onClick={onClick}>
      <div id="menu_button">
        <input type="checkbox" id="menu_checkbox" />
        <label htmlFor="menu_checkbox" id="menu_label">
          <div id="menu_text_bar"></div>
        </label>
      </div>
    </div>
  );
};

export default Hamburguer;
