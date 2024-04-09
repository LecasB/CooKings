// App.js
import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	BrowserRouter,
} from "react-router-dom";
import LoadingScreen from "./LoadingScreen/LoadingPage";
import SignUpForm from "./SignUpPage/SignUpForm";
import LoginForm from "./LoginPage/LoginForm";
import SearchForm from "./SearchPage/SearchForm";
import SearchPage from "./SearchPage/SearchPage";
import IndexPage from "./IndexPage/IndexPage";

const MenuTeste = () => {
	return (
		<BrowserRouter>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/LoadingPage">Loading Page</Link>
						</li>
						<li>
							<Link to="/LoginPage">Login Form</Link>
						</li>
						<li>
							<Link to="/SignUpPage">Sign Up</Link>
						</li>
						<li>
							<Link to="/SearchPage">Search page</Link>
						</li>
						<li>
							<Link to="/IndexPage">Index page</Link>
						</li>
					</ul>
				</nav>

				<Routes>
					<Route path="/LoadingPage" element={<LoadingScreen />} />
					<Route path="/LoginPage" element={<LoginForm />} />
					<Route path="/SignUpPage" element={<SignUpForm />} />
					<Route path="/SearchPage" element={<SearchPage />} />
					<Route path="/IndexPage" element={<IndexPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default MenuTeste;
