import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";

// Pages et Components
import Login from  "../components/Login/Login.jsx";
import RecipeListPage from "../RecipeListPage/RecipeListPage.jsx";
import NavBar from "./NavBar/NavBar";
import SignUp from "../components/SignUp/SignUp.jsx"; 
import Home from "../components/Home/Home.jsx";
import Profil from "./Profil/Profil.jsx";
import RecipeDetailPage from "../RecipeDetailPage/RecipeDetailPage.jsx";
import MyRecipeList from "../Pages/MyRecipeList.jsx";

function App() {
  const { user } = useAuthContext();


  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/RecipeListPage" element={<RecipeListPage />} />
          <Route path="/signup"  element={!user ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profil /> : <Navigate to="/" />} />
          <Route path="/recipe/:id" element= { <RecipeDetailPage />} />
          <Route path="/myRecipes" element={user ? <MyRecipeList /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;