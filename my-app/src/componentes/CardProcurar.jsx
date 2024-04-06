import React from "react";
import "../estilos/CardProcurar.css";

const CardProcurar = ({ titulo, texto }) => {
	return (
		<div className="card-procurar">
			<figure className="cont-img-procurar">
				<img src="https://wallpaperaccess.com/full/767093.jpg" alt="" />
			</figure>
			<div className="cont">
				<div className="cont-text">
					<h2>{titulo}</h2>
					<p>{texto}</p>
				</div>

				<div className="cont-actions-procurar">
					<button type="button">View recipe</button>
					<i className="fa-solid fa-crown"></i>
				</div>
			</div>
		</div>
	);
};

export default CardProcurar;
