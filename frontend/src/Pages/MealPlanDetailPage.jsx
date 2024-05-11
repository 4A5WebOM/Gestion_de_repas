import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import "./MealPlanDetailPage.css";

const MealPlanDetailPage = () => {
  const { id } = useParams();
  const { token } = useAuthContext();
  const [recipeTitles, setRecipeTitles] = useState({});
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlanAndRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/meal-plans/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        const data = await response.json();
        setMealPlan(data);

        // Fetch the recipe titles
        const recipeTitles = {};
        for (let day of data.mealPlan.days) {
          for (let meal of day.meals) {
            const recipeResponse = await fetch(
              `http://localhost:4000/api/recipes/${meal.recipe}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log("Recipe response:", recipeResponse);
            if (!recipeResponse.ok) {
              throw new Error("Unauthorized");
            }
            const recipeData = await recipeResponse.json();
            recipeTitles[meal.recipe] = recipeData.recipe.title;
          }
        }
        setRecipeTitles(recipeTitles);
        console.log("Recipe titles:", recipeTitles);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealPlanAndRecipes();
  }, [id, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mealPlanDetailPage">
      {mealPlan ? (
        <>
          <h2>{mealPlan.mealPlan.title}</h2>
          <p>Description: {mealPlan.mealPlan.description}</p>
          <h3>Plan de repas:</h3>
          <ul>
            {mealPlan.mealPlan.days &&
              mealPlan.mealPlan.days.map((day, index) => (
                <li key={index}>
                  <h4>{day.day}</h4>
                  <ul>
                    {day.meals &&
                      day.meals.map((meal, index) => (
                        <li key={index}>
                          <strong>{meal.time}:</strong>{" "}
                          {recipeTitles[meal.recipe] || "Recette inconnue"}
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
          </ul>
          <p>
            Créé le :{" "}
            <span>
              {new Date(mealPlan.mealPlan.createdAt).toLocaleString()}
            </span>
          </p>
        </>
      ) : (
        <p>Vous n'avez pas encore créé de plan de repas.</p>
      )}
    </div>
  );
};

export default MealPlanDetailPage;
