import React, { useEffect, useState } from 'react';
import './RecipeListPage.css';
const RecipeListPage = () => {
const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/recipes'); 
      const donnees = await response.json();
      setRecipes(donnees.recipes);
    } catch (error) {
      console.error('Erreur avec la base de données:', error);
    }
  };

return (
  <div className="recipeListPage">
    <h1>Recipe List</h1>
    {recipes.map((recipe) => (
      <div key={recipe._id}>
        <h2>{recipe.title}</h2>
        <p>{recipe.description}</p>
      </div>
    ))}
  </div>
);
};

export default RecipeListPage;