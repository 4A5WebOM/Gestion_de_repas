import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from  "../components/Login/Login.jsx";
import RecipeListPage from "../components/RecipeListPage/RecipeListPage.jsx";
import NavBar from "./NavBar/NavBar";
import SignUp from "../components/SignUp/SignUp.jsx"; // Add this line

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/RecipeListPage" element={<RecipeListPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;