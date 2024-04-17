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
import UserPage from "./UserPage/UserPage";
import IngredientsListPage from "./IngredientsListPage/IngredientsListPage";
import EditRecipePage from "./EditRecipePage/EditRecipePage";

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
						<li>
							<Link to="/UserPage">User page</Link>
						</li>
						<li>
                            <Link to="/EditRecipePage">EditRecipe</Link>
                        </li>
						<li>
                            <Link to="./IngredientsListPage/IngredientsListPage">IngredientsListPage</Link>
                        </li>
					</ul>
				</nav>

				<Routes>
					<Route path="/LoadingPage" element={<LoadingScreen />} />
					<Route path="/LoginPage" element={<LoginForm />} />
					<Route path="/SignUpPage" element={<SignUpForm />} />
					<Route path="/SearchPage" element={<SearchPage />} />
					<Route path="/IndexPage" element={<IndexPage />} />
					<Route path="/EditRecipePage" element={<EditRecipePage />} />
					<Route path="/IngredientsListPage/IngredientsListPage" element={<IngredientsListPage />} />
					<Route path="/UserPage" element={<UserPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default MenuTeste;
