import React from "react";
import './cardInicial.css';

const CardInicial = ({titulo, texto}) => {
    return (
        <div className="card-pi">
            <div className="cont-img">
                <img src="https://wallpaperaccess.com/full/767093.jpg" alt="" />
            </div>
            <div className="cont">
                <div className="cont-text">
                    <h2>{titulo}</h2>
                    <p>{texto}</p>
                </div>

                <div className="cont-actions">
                    <button type="button">View recipe</button>
                    <i className="fa-solid fa-crown"></i>
                </div>
            </div>
        </div>
    );
}

export default CardInicial; 