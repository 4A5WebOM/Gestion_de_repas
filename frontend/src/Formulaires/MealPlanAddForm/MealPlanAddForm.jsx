import React, { useState } from "react";
import "./MealPlanAddForm.css";

const MealPlanAddForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    days: [{ day: "", meals: [{ time: "", recipe: "" }] }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDayChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDays = [...formData.days];
    updatedDays[index][name] = value;
    setFormData({
      ...formData,
      days: updatedDays,
    });
  };

  const handleMealChange = (e, dayIndex, mealIndex) => {
    const { name, value } = e.target;
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].meals[mealIndex][name] = value;
    setFormData({
      ...formData,
      days: updatedDays,
    });
  };

  const handleAddDay = () => {
    setFormData({
      ...formData,
      days: [...formData.days, { day: "", meals: [{ time: "", recipe: "" }] }],
    });
  };

  const handleAddMeal = (dayIndex) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].meals.push({ time: "", recipe: "" });
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
        <div>
          <button type="button" onClick={handleAddDay}>
            Ajouter un jour
          </button>
          {formData.days.map((day, index) => (
            <div key={index}>
              <h3>Jour {index + 1}</h3>
              <div>
                <label>Jour:</label>
                <select
                  name="day"
                  value={day.day}
                  onChange={(e) => handleDayChange(e, index)}
                >
                  <option value="">Sélectionner</option>
                  <option value="Lundi">Lundi</option>
                  <option value="Mardi">Mardi</option>
                  <option value="Mercredi">Mercredi</option>
                  <option value="Jeudi">Jeudi</option>
                  <option value="Vendredi">Vendredi</option>
                  <option value="Samedi">Samedi</option>
                  <option value="Dimanche">Dimanche</option>
                </select>
              </div>
              <button type="button" onClick={() => handleAddMeal(index)}>
                Ajouter un repas
              </button>
              {day.meals.map((meal, mealIndex) => (
                <div key={mealIndex}>
                  <h4>Repas {mealIndex + 1}</h4>
                  <div>
                    <label>Temps:</label>
                    <select
                      name="time"
                      value={meal.time}
                      onChange={(e) => handleMealChange(e, index, mealIndex)}
                    >
                      <option value="">Sélectionner</option>
                      <option value="Déjeuner">Déjeuner</option>
                      <option value="Diner">Diner</option>
                      <option value="Souper">Souper</option>
                    </select>
                  </div>
                  <div>
                    <label>Recette:</label>
                    <input
                      type="text"
                      name="recipe"
                      value={meal.recipe}
                      onChange={(e) => handleMealChange(e, index, mealIndex)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <button type="submit">Créer le plan de repas</button>
      </form>
    </div>
  );
};

export default MealPlanAddForm;
