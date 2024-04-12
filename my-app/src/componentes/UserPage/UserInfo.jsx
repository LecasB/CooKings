import React from "react";
import "../../estilos/UserLateral.css";
import { Profile } from "../../imagens/svgs";

const UserInfo = () => {
	return (
		<div className="UserInfo">
			<section className="Perfil">
				<figure className="">
					<Profile />
				</figure>

				
					<input type="text" name="Nome" id="" placeholder="Name"/>
				
				
					<input type="email" name="Email" id=""  placeholder="E-mail"/>
				
				<button type="button">Change Password</button>
				<select title="Categories" name="Categories" id="">
					<option value="" selected disabled hidden>Choose here</option>
					<option value="Chinese">Chinese Food</option>
					<option value="Spicy">Spicy</option>
					<option value="Vegan">Vegan</option>
				</select>
			</section>
		</div>
	);
};

export default UserInfo;
