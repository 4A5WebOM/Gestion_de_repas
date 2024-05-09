import React, { useState, useEffect } from "react";
import "./MealPlanEditForm.css";

const MealPlanEditForm = ({ mealPlan, onSubmit }) => {
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
    if (mealPlan) {
      fetchRecipes();
      setFormData({
        title: mealPlan.title || "",
        description: mealPlan.description || "",
        days: mealPlan.days || [],
      });
    }
  }, [mealPlan]);

  const fetchRecipes = async (time) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/recipes?category=${time}`
      );
      const data = await response.json();
      return data.recipes;
    } catch (error) {
      console.error("Erreur:", error);
      return [];
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMealChange = async (e, dayIndex, mealIndex) => {
    const { name, value } = e.target;
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].meals[mealIndex][name] = value;
    if (name === "time") {
      const recipes = await fetchRecipes(value);
      updatedDays[dayIndex].meals[mealIndex].recipes = recipes;
    }
    setFormData({
      ...formData,
      days: updatedDays,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="mealPlanEditForm">
      <h2>Modifier un plan de repas</h2>
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
        <div>
          {formData.days.map((day, index) => (
            <div key={index}>
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
        </div>

        <button type="submit">Mettre à jour le plan de repas</button>
      </form>
    </div>
  );
};

export default MealPlanEditForm;
