import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/profile">Mon Compte</Link>
                </li>
                <li>
                    <Link to="/myRecipes">Mes Recettes</Link>
                </li>
                <li>
                    <Link to="/myMealPlans">Mes Plans de Repas</Link>
                </li>
                <li>
                    <Link to="/Favorites">Mes Recettes Favorites</Link>
                </li>
            </ul>
        </div>
    )};