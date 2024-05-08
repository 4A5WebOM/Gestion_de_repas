import React from "react";
import "./Home.css";

export default function Home() {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <div className="home-background">
        <h1>Bienvenue</h1>
        <button onClick={scrollDown} className="home-scroll-down-button">
          Entrer
        </button>
      </div>
      <div className="home-latest-recipes">
        <h1>Les dernières recettes</h1>
        
      </div>
    </>
  );
}
