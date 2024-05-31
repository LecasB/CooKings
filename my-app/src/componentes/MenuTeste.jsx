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
import Layout from "./Layout";
import LayoutAdmin from "./AdminDashboard/LayoutAdmin";
import LayoutClient from "./ClientDashboard/LayoutClient";
import NavBar from "./NavBar";
import ErrorPage from "./ErrorPage/errorPage";
import AdminDashboardPage from "./AdminDashboard/AdminDashboardPage";
import ListaIngridiente from "./AdminDashboard/ListaIngridiente";
import NovoIngrediente from "./AdminDashboard/NovoIngrediente";
import EditIngrediente from "./AdminDashboard/EditIngrediente";
import NovaReceita from "./AdminDashboard/NovaReceita";
import ListaReceitas from "./AdminDashboard/ListaReceitas";
import NovaCategoriaIngrediente from "./AdminDashboard/NovaCategoriaIngrediente";
import NovaCategoriaReceita from "./AdminDashboard/NovaCategoriaReceita";
import EditRecipe from "./AdminDashboard/EditRecipe";
import Dashboard from "./AdminDashboard/Dashboard";
import NovoIngredienteClient from "./ClientDashboard/NovoIngredienteClient";
import FavoritosClient from "./ClientDashboard/FavoritosClient";
import ListaIngredienteClient from "./ClientDashboard/ListaIngredienteClient";
import EditIngredienteClient from "./ClientDashboard/EditIngredienteClient";
import NovaReceitaClient from "./ClientDashboard/NovaReceitaClient";
import ClientDashboard from "./ClientDashboard/ClienteDashboard";
import ViewRecipePage from "./ViewRecipePage/ViewRecipePage";
import CategoriesChoice from "./CategoriesChoice";
import AprovarReceitas from "./AdminDashboard/AprovarReceitas";
import PasswordReset from "./PasswordReset";
import EmailPasswordReset from "./EmailPasswordReset";

const MenuTeste = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="LoadingPage" element={<LoadingScreen />} />
            <Route path="LoginPage" element={<LoginForm />} />
            <Route path="SignUpPage" element={<SignUpForm />} /> */}
          <Route path="SearchPage" element={<SearchPage />} />
          <Route index path="/" element={<IndexPage />} />
          <Route path="EditRecipePage" element={<EditRecipePage />} />
          <Route
            path="IngredientsListPage/IngredientsListPage"
            element={<IngredientsListPage />}
          />
          <Route path="ViewRecipePage" element={<ViewRecipePage />} />
          <Route path="PasswordReset" element={<PasswordReset />} />
          <Route path="EmailPasswordReset" element={<EmailPasswordReset />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>

        <Route path="/">
          <Route path="CategoriesChoice" element={<CategoriesChoice />} />
          <Route path="LoadingPage" element={<LoadingScreen />} />
          <Route path="LoginPage" element={<LoginForm />} />
          <Route path="SignUpPage" element={<SignUpForm />} />
          <Route path="AdminDashboardPage" element={<AdminDashboardPage />} />

          {/* <Route path="NovoIngrediente" element={<NovoIngrediente />} /> */}
          {/* <Route path="EditIngrediente" element={<EditIngrediente />} /> */}
        </Route>

        <Route path="/AdminDashboardPage" element={<LayoutAdmin />}>
          <Route
            path="/AdminDashboardPage/NovoIngrediente"
            element={<NovoIngrediente />}
          />
          <Route index path="/AdminDashboardPage/" element={<Dashboard />} />
          <Route
            path="/AdminDashboardPage/EditIngrediente"
            element={<EditIngrediente />}
          />
          <Route
            path="/AdminDashboardPage/EditRecipe"
            element={<EditRecipe />}
          />
          <Route
            path="/AdminDashboardPage/ListaIngridiente"
            element={<ListaIngridiente />}
          />
          <Route
            path="/AdminDashboardPage/NovaReceita"
            element={<NovaReceita />}
          />
          <Route
            index
            path="/AdminDashboardPage/ListaReceitas"
            element={<ListaReceitas />}
          />
          <Route
            path="/AdminDashboardPage/NovaCategoriaIngrediente"
            element={<NovaCategoriaIngrediente />}
          />
          <Route
            path="/AdminDashboardPage/AprovarReceita"
            element={<AprovarReceitas />}
          />

          <Route
            path="/AdminDashboardPage/NovaCategoriaReceita"
            element={<NovaCategoriaReceita />}
          />
        </Route>

        <Route path="/ClientDashboard" element={<LayoutClient />}>
          <Route index path="/ClientDashboard/" element={<ClientDashboard />} />

          <Route path="UserPage" element={<UserPage />} />

          <Route
            path="/ClientDashboard/NovoIngredienteClient"
            element={<NovoIngredienteClient />}
          />

          <Route
            path="/ClientDashboard/FavoritosClient"
            element={<FavoritosClient />}
          />

          <Route
            path="/ClientDashboard/ListaIngredienteClient"
            element={<ListaIngredienteClient />}
          />

          <Route
            path="/ClientDashboard/EditIngredienteClient"
            element={<EditIngredienteClient />}
          />

          <Route
            path="/ClientDashboard/NovaReceitaClient"
            element={<NovaReceitaClient />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MenuTeste;
