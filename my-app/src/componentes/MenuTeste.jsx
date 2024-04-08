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
import LoginPage from "./LoginPage/LoginForm";
import SignUpPage from "./SignUpPage/SignUpForm";
import LoginForm from "./LoginPage/LoginForm";
import SearchPage from "./SearchPage/SearchPage";

const MenuTeste = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/LoadingPage">Loading page</Link>
            </li>
            <li>
              <Link to="/LoginPage">Login form</Link>
            </li>
            <li>
              <Link to="/SignUpPage">Sign up</Link>
            </li>
            <li>
              <Link to="/SearchPage">Search page</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* <Route path="/LoadingPage" component={LoadingScreen} /> */}
          <Route path="/LoadingPage" element={<LoadingScreen />} />
          <Route path="/LoginPage" element={<LoginForm />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/SearchPage" element={<SearchPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default MenuTeste;
