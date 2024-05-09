import React, { useEffect, useState } from "react";
import "./RecipeListPage.css";
import RecipeDetail from "../components/RecipeDetail/RecipeDetail";

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/recipes");
      const donnees = await response.json();
      setRecipes(donnees.recipes);
    } catch (error) {
      console.error("Erreur avec la base de données:", error);
    }
  };

  return (
    <div className="recipeListPage">
      {recipes.map((recipe) => (
        <RecipeDetail key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeListPage;
