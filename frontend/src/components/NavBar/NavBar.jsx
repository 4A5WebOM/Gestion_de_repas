import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import "../Login/Login.jsx";
import"../../RecipeListPage/RecipeListPage.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const { user, logout } = useAuthContext();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="dropdown">
          <span>Recettes</span>
          <div className="dropdown-content">
            <Link to="/RecipeListPage">Liste des recettes</Link>
            {user && (
              <Link to="/RecipeFormPage">Ajouter/modifier une recette</Link>
            )}
          </div>
        </li>
        <li className="dropdown">
          <span>Plans de Repas</span>
          <div className="dropdown-content">
            <Link to="/MealPlanListPage">Liste des plans de repas</Link>
            {user && (
              <Link to="/MealPlanFormPage">
                Ajouter/modifier un plan de repas
              </Link>
            )}
          </div>
        </li>
        {!user && (
          //desactive au moment qu'un utililisateur est connecte
          <>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
              <Link to="/signup">Inscription</Link>
            </li>
          </>
        )}
        {user && (
          //active au moment qu'un utilisateur est connecte
          <>
            <li>
              <button onClick={logout}>Deconnexion</button>
            </li>
            <li>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} /> Mon compte
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
