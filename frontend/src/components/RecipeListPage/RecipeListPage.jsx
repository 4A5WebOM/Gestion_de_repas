import React, { useEffect, useState } from 'react';
import "../RecipeListPage/RecipeListPage.css";

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);

  return (
    <div className="recipeListPage">
      <h1>Recipe List</h1>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeListPage;