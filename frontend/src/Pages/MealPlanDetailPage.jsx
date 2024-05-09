import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MealPlanDetailPage = () => {
  const { id } = useParams();
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/meal-plans/${id}`
        );
        const data = await response.json();
        setMealPlan(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchMealPlan();
  }, [id]);

  return (
    <div className="mealPlanDetailPage">
      {mealPlan ? (
        <>
          <h2>{mealPlan.title}</h2>
          <p>Description: {mealPlan.description}</p>
          <h3>Plan de repas:</h3>
          <ul>
            {mealPlan.days.map((day, index) => (
              <li key={index}>
                <h4>{day.day}</h4>
                <ul>
                  {day.meals.map((meal, index) => (
                    <li key={index}>
                      <strong>{meal.time}:</strong> {meal.recipe.title}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p>Créé par : {mealPlan.createdBy.username}</p>
          <p>Date : {new Date(mealPlan.createdAt).toLocaleString()}</p>
        </>
      ) : (
        <p>Vous n'avez pas encore crée un plan de repas.</p>
      )}
    </div>
  );
};

export default MealPlanDetailPage;
