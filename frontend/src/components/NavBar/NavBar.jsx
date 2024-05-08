import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import "../Login/Login.jsx";
import "../RecipeListPage/RecipeListPage.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.js";


function NavBar() {
  const { user } = useAuthContext();

  return (
    <nav className="navbar">
      <ul>
        {!user && (
          <>
            <li>
              <Link to="/login" >
                Connexion
              </Link>
            </li>
            <li>
              <Link to="/signup" >
                Inscription
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/RecipeListPage" >
            Nos recettes
          </Link>
        </li>
        <li>
          <Link to="/" >
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;