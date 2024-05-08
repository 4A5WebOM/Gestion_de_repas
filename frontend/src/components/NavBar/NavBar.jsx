import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import "../Login/Login.jsx";
import "../RecipeListPage/RecipeListPage.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.js";

function NavBar() {
  const { user, logout } = useAuthContext();

  return (
    <nav className="navbar">
      <ul>
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
        <li className="dropdown">
          <span>Nos Recettes</span>

          <div className="dropdown-content">
            <Link to="/RecipeListPage">Liste des recettes</Link>
            <Link to="/RecipeDetailPage">Détails des recettes</Link>
            <Link to="/RecipeFormPage">Ajouter/modifier une recette</Link>
          </div>
        </li>
        <li className="dropdown">
          <span>Plans de Repas</span>

          <div className="dropdown-content">
            <Link to="/MealPlanListPage">Liste des plans de repas</Link>
            <Link to="/MealPlanDetailPage">Détails des plans de repas</Link>
            <Link to="/MealPlanFormPage">
              Ajouter/modifier un plan de repas
            </Link>
          </div>
        </li>
        {user && (
          //active au moment qu'un utilisateur est connecte
          <>
            <li>
              <button onClick={logout}>Deconnexion</button>
            </li>
            <li>
              <Link to="/ProfilePage">Profil</Link>
            </li>
            <li>
              <Link to="/FavoritesPage">Favoris</Link>
            </li>
            <li>
              <Link to="/GroceryListPage">Liste d'Épicerie</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
