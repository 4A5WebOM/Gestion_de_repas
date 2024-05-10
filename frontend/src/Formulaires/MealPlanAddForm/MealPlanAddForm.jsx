import React, { useState, useEffect } from "react";
import "./MealPlanAddForm.css";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";

const MealPlanAddForm = ({ onSubmit }) => {
  const { user, token } = useAuthContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    days: [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ].map((day) => ({
      day,
      meals: [
        { time: "Déjeuner", recipe: "", recipes: [] },
        { time: "Diner", recipe: "", recipes: [] },
        { time: "Souper", recipe: "", recipes: [] },
      ],
    })),
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/recipes");
      const data = await response.json();
      return data.recipes;
    } catch (error) {
      console.error("Erreur:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleMealChange = async (e, dayIndex, mealIndex) => {
    const { name, value } = e.target;
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].meals[mealIndex][name] = value;
    if (name === "time") {
      const recipes = await fetchRecipes();
      updatedDays[dayIndex].meals[mealIndex].recipes = recipes;
    }
    setFormData({
      ...formData,
      days: updatedDays,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      setFormData({ ...formData, createdBy: user._id });
    }

    try {
      const response = await fetch("http://localhost:4000/api/meal-plans/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error("Erreur lors de la requête.");
      }

      navigate("/myMealPlans");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mealPlanAddForm">
      <h2>Créer un plan de repas</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        {formData.days.map((day, dayIndex) => (
          <div key={dayIndex}>
            <h3>{day.day}</h3>
            {day.meals.map((meal, mealIndex) => (
              <div key={mealIndex}>
                <h4>{meal.time}</h4>
                <div>
                  <label>Recette:</label>
                  <select
                    name="recipe"
                    value={meal.recipe}
                    onChange={(e) => handleMealChange(e, dayIndex, mealIndex)}
                  >
                    <option value="">Sélectionner</option>
                    {meal.recipes.map((recipe) => (
                      <option key={recipe._id} value={recipe._id}>
                        {recipe.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Créer le plan de repas</button>
      </form>
    </div>
  );
};

export default MealPlanAddForm;
