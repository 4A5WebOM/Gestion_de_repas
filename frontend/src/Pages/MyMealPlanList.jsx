import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import SideBar from "../components/SideBar/SideBar";
import MealPlanList from "../components/MealPlan/MealPlanList";

export default function MyMealPlanList() {
  const { user, token } = useAuthContext();
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      const response = await fetch("http://localhost:4000/api/meal-plans/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        const userMealPlans = data.mealPlans.filter(
          (mealPlan) => mealPlan.createdBy === user._id
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
      <div className="recipeListPage" style={{ marginLeft: "250px" }}>
        {mealPlans && (
          <MealPlanList mealPlans={mealPlans} key={mealPlans._id} />
        )}
      </div>
    </div>
  );
}
