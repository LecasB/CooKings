import React from "react";
import "../../estilos/IndexPage.css";

import chefimage from "../../imagens/cozinhaste.png";

import BoasText from "./BoasText";
import NavBar from "../NavBar";

const IndexPage = () => {
	return (
		<>
			<header>
				<NavBar />
			</header>
			<main className="IndexPage">
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<BoasText />
					<figure>
						<img src={chefimage} alt="" srcset="" />
					</figure>
				</div>
			</main>
		</>
	);
};

export default IndexPage;
