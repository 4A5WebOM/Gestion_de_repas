import React, { useEffect, useState } from "react";
import "./MealPlanList.css";

const MealPlanList = ({ mealPlans }) => {
  return (
    <div>
      <h2>Meal Plans</h2>
      <ul>
        {mealPlans.map((mealPlan) => (
          <li key={mealPlan.id}>
            <h3>{mealPlan.title}</h3>
            <p>{mealPlan.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealPlanList;
