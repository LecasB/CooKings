import React from "react";
import "../estilos/CardProcurar.css";
import { Link } from 'react-router-dom'


const CardProcurar = ({ titulo, texto, image, id }) => {

	function refreshPage(){      
		window.parent.location()
	 }

	return (
		<div className="card-procurar">
			<figure className="cont-img-procurar">
				<img src={image} alt="" />
			</figure>
			<div className="cont">
				<div className="cont-text">
					<h2>{titulo}</h2>
					<p>{texto}</p>
				</div>

				<div className="cont-actions-procurar">
				<Link onClick={refreshPage} to={`/ViewRecipePage?=${id}`}>
                <buton>View</buton>
                </Link>
					<i className="fa-solid fa-crown"></i>
				</div>
			</div>
		</div>
	);
};

export default CardProcurar;
