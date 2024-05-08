import React, { useState, useEffect } from "react";
//
const MealPlanEditForm = ({ mealPlan, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    calories: "",
  });

  useEffect(() => {
    if (mealPlan) {
      setFormData({
        title: mealPlan.title || "",
        description: mealPlan.description || "",
        ingredients: mealPlan.ingredients || "",
        calories: mealPlan.calories || "",
      });
    }
  }, [mealPlan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
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
          <label>Ingrédients:</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Calories:</label>
          <input
            type="text"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Mettre à jour le plan de repas</button>
      </form>
    </div>
  );
};

export default MealPlanEditForm;
