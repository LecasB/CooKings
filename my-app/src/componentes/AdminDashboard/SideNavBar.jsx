import Logo from "../../imagens/cooKingsImagev1.png";
import "../../estilos/SideNavBar.css";
import { Link } from "react-router-dom";

const SideNavBar = () => {
  return (
    <nav className="sidenavbar">
      <img src={Logo} alt="logo" srcset="" />
      <ul>
        <li>
          <div>
            <Link> Dashborad </Link>
          </div>
        </li>

        <li>
          <div>
            <Link> New Recipes </Link>
          </div>
        </li>

        <li>
          <div>
            <Link> Order List </Link>
          </div>
        </li>

        <li>
          <div>
            <Link> Update Products </Link>
          </div>
        </li>

        <li>
          <div>
            <Link> Update Recipes </Link>
          </div>
        </li>

        <li>
          <div>
            <Link> Insert Products </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavBar;
