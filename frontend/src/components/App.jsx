import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";

// Pages et Components
import Login from "../components/Login/Login.jsx";
import RecipeListPage from "../components/RecipeListPage/RecipeListPage.jsx";
import NavBar from "./NavBar/NavBar";
import SignUp from "../components/SignUp/SignUp.jsx";
import Home from "../components/Home/Home.jsx";
import Profil from "./Profil/Profil.jsx";
import MealPlanListPage from "../MealPlanListPage/MealPlanListPage.jsx";
function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/RecipeListPage" element={<RecipeListPage />} />
          <Route path="/MealPlanListPage" element={<MealPlanListPage />} />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={user ? <Profil /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
