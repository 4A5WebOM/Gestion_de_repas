import React from 'react';
import "../RecipeDetail/RecipeDetail.css";

const RecipeDetail = ({ recipe }) => {
  return (
    <div key={recipe._id}>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
    </div>
  );
};

export default RecipeDetail;