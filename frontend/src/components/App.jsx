import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from  "../components/Login/Login.jsx";
import RecipeListPage from "../components/RecipeListPage/RecipeListPage.jsx";
import NavBar from "./NavBar/NavBar";

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/RecipeListPage" element={<RecipeListPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;