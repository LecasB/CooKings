import React from "react";
import "../../estilos/UserLateral.css";
import { Account, Coroa, Ingredients } from "../../imagens/svgs";

const UserLateral = () => {
	return (
		<div className="UserLateral">
			<div className="butoesdiv">
				<button className="butao">
					<Account />
					<span>Account</span>
				</button>

				<button className="butao">
					<Coroa />
					<span>My favorites</span>
				</button>

				<button className="butao" id="ingredients">
					<Ingredients />
					<span>Ingredients</span>
				</button>
			</div>
		</div>
	);
};

export default UserLateral;
