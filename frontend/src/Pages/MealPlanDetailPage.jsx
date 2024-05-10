import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import "./MealPlanDetailPage.css";

const MealPlanDetailPage = () => {
  const { id } = useParams();
  const { token } = useAuthContext();

  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    const fetchMealPlan = async () => {
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
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchMealPlan();
  }, [id, token]);

  return (
    <div className="mealPlanDetailPage">
      {mealPlan ? (
        <>
          <h2>{mealPlan.title}</h2>
          <p>Description: {mealPlan.description}</p>
          <h3>Plan de repas:</h3>
          <ul>
            {mealPlan.days &&
              mealPlan.days.map((day, index) => (
                <li key={index}>
                  <h4>{day.day}</h4>
                  <ul>
                    {day.meals &&
                      day.meals.map((meal, index) => (
                        <li key={index}>
                          <strong>{meal.time}:</strong>{" "}
                          {meal.recipe ? meal.recipe.title : ""}
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
          </ul>
          <p>
            Créé par : <span>{mealPlan.createdBy?.username}</span>
          </p>
          <p>
            Date : <span>{new Date(mealPlan.createdAt).toLocaleString()}</span>
          </p>
        </>
      ) : (
        <p>Vous n'avez pas encore créé de plan de repas.</p>
      )}
    </div>
  );
};

export default MealPlanDetailPage;
