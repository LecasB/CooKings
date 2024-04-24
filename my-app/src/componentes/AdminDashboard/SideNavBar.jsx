import Logo from "../../imagens/cooKingsImagev1.png";
import "../../estilos/SideNavBar.css";
import { Link } from "react-router-dom";

const SideNavBar = () => {
  return (
    <nav className="sidenavbar">
      <img src={Logo} alt="logo" srcset="" />
      <ul>
        <li>
          <Link> Dashborad </Link>
        </li>

        <li>
          <Link> New Recipes </Link>
        </li>

        <li>
          <Link> Order List </Link>
        </li>

        <li>
          <Link> Update Products </Link>
        </li>

        <li>
          <Link> Update Recipes </Link>
        </li>

        <li>
          <Link> Insert Products </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavBar;
