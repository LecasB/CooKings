import React from "react";



import NavBar from "../NavBar";
import UserLateral from "./UserLateral";

const UserPage = () => {
	return (
		<>
			<header>
				<NavBar />
			</header>
			<main >
				<div>
					<UserLateral />
					
				</div>
			</main>
		</>
	);
};

export default UserPage;
