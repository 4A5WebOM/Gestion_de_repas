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
          <Link to="/login" >
              Connexion
            </Link>
          </li>
          <li>
            <Link to="/RecipeListPage" >
              Nos recettes
            </Link>
          </li>
          <li>
            <Link to="/signup">
              Inscription
            </Link>
          </li>
      </ul>
    </nav>
  );
}

export default NavBar;