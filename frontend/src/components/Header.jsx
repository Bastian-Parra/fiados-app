import "../styles/NavBar.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="navbar">
      <h1>Aplicacion de Fiados Provisiones Aymi</h1>
      <nav>
        <ul>
          <li>
            <Link className="btn btn-primary" to="/clientes">Clientes</Link>
          </li>
        </ul> 
      </nav>
    </header>
  );
}

export default Header;
