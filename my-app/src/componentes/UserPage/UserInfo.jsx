import React from "react";
import "../../estilos/UserLateral.css";
import { Account, Coroa, Ingredients, Profile } from "../../imagens/svgs";

const UserInfo = () => {
	return (
		<div className="UserInfo">
			<section className="">
				<figure className="">
					<Profile />
				</figure>

				<label htmlFor="">
					<input type="text" name="Nome" id="" />
				</label>
				<label htmlFor="">
					<input type="email" name="Email" id="" />
				</label>
				<button type="button">Change Password</button>
				<select name="Categories" id="">
					<option value="Chinese">Chinese Food</option>
					<option value="Spicy">Spicy</option>
					<option value="Vegan">Vegan</option>
				</select>
			</section>
		</div>
	);
};

export default UserInfo;
