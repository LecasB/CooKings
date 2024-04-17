import React from "react";

import NavBar from "../NavBar";
import UserLateral from "./UserLateral";
import UserInfo from "./UserInfo";
import "../../estilos/UserLateral.css";



const UserPage = () => {
	return (
		<>
			<header>
				<NavBar />
			</header>
			<main>
				<div className="UserPage">
					<UserLateral />
					<UserInfo />
					{/* <UserLateral /> */}
					
				</div>
			</main>
		</>
	);
};

export default UserPage;
