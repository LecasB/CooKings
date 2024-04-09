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
<<<<<<<<< Temporary merge branch 1
import SearchForm from "./SearchPage/SearchForm";
=========
import SearchPage from "./SearchPage/SearchPage";
>>>>>>>>> Temporary merge branch 2

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
              <Link to="/SearchPage">Search Form</Link>
            </li>
            <li>
              <Link to="/SearchPage">Search page</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/LoadingPage" element={<LoadingScreen />} />
          <Route path="/LoginPage" element={<LoginForm />} />
<<<<<<<<< Temporary merge branch 1
          <Route path="/SignUpPage" element={<SignUpForm />} />
          <Route path="/SearchPage" element={<SearchForm />} />
=========
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/SearchPage" element={<SearchPage />} />
>>>>>>>>> Temporary merge branch 2
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default MenuTeste;
