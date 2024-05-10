import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./RecipeDetailPage.css";
import { useAuthContext } from "../hooks/useAuthContext";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { user, token } = useAuthContext();
  const navigate = useNavigate(); // permet de naviguer entre les routes
   //( je l'ai utiliser pour aller dans myRecipes )

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

  const handleDelete = async () => {
   
      const response = await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        navigate('/my-recipes'); //  Supprimer la recettes si elle est dans Mes recettes 
      } else {
        console.error('Erreur lors de la suppression de la recette');
      }
    
    
  };

  return (
    <div className="recipeDetailPage">
      {recipe ? (
        <>
        {user && user._id === recipe.createdBy && (
            <button onClick={handleDelete}>Supprimer</button>
          )}
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

