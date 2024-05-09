import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import MealPlanDetail from "../components/MealPlan/MealPlanDetail";
import SideBar from "../components/SideBar/SideBar";

export default function MyMealPlanList() {
  const { user, token } = useAuthContext();
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      const response = await fetch('http://localhost:4000/api/meal-plans', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        const userMealPlans = data.mealPlans.filter(
          mealPlan => mealPlan.createdBy === user._id
        );
        setMealPlans(userMealPlans);
      } else {
        console.error(data.message);
      }
    };
    fetchMealPlans();
  }, [user]);

  return (
    <div>
      <SideBar />
      <div className="recipeListPage" style={{ marginLeft: '250px' }}>
        {mealPlans.map((mealPlan) => (
            <MealPlanDetail mealPlan={mealPlan} key={mealPlan._id} />
        ))}
      </div>
    </div>
  );
}