import Logo from "../../imagens/cooKingsImagev1.png";
import "../../estilos/SideNavBar.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <nav className="sidenavbar">
      <ul>
        <li>
          <Link to="Dashboard"> Dashboard </Link>
        </li>

        <li>
          <Link to="NovaReceita"> New Recipe </Link>
        </li>

        <li>
          <Link to="ListaIngridiente"> My Ingriedients </Link>
        </li>

        <li>
          <Link to="ListaReceitas"> Edit Ingridients </Link>
        </li>

        <li>
          <Link to="NovaCategoriaIngrediente"> Add Ingridient </Link>
        </li>

        <li>
          <div>
            <Link to="NovaCategoriaReceita"> My Favourites </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
