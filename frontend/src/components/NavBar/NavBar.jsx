import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import "../Login/Login.jsx";
import "../RecipeListPage/RecipeListPage.jsx";
function NavBar() {
  return (
    <nav className="navbar">
      <ul>
      <li>
            <Link to="/" onClick={() => setIsNavOpen(false)}>
              connexion
            </Link>
          </li>
          <li>
            <Link to="/RecipeListPage" onClick={() => setIsNavOpen(false)}>
              Nos recettes
            </Link>
          </li>
      </ul>
    </nav>
  );
}

export default NavBar;