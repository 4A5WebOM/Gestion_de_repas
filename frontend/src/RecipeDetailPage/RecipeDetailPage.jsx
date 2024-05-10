import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./RecipeDetailPage.css";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/recipes/${id}`); 
      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="recipeDetailPage">
      {recipe ? (
        <>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <p>{recipe.description}</p>
          <div className="column">
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.quantity} {ingredient.unit}  {ingredient.name}</li>
              ))}
            </ul>
          </div>
          <div className="column">
            <h3>Instructions:</h3>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          <p>Catégorie {recipe.category}</p>
     
        </>
      ) : (
        <p>Rien...</p>
      )}
    </div>
  );
};

export default RecipeDetailPage;
