import React, { useState, useEffect } from "react";
import FormCreate from "../components/Forms/FormCreate";
import apiHandler from "../api/apiHandler";
import Recipe from "../components/Recipe";

function Recipes(props) {
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [temp, setTemp] = useState([]);

  function getAllRecipes() {
    apiHandler
      .getRecipes()
      .then((resp) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        setRecettes(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <div className="recettes">
      <h1 className="recettes-title">Les Recettes </h1>
      <div className="container">
        {loading ? (
          <img
            className="loading"
            src="https://i.gifer.com/LPxR.gif"
            alt="loading gif"
          />
        ) : (
          <div className="recipe-container">
            {recettes.map((recette) => {
              return (
                <Recipe
                  key={recette._id}
                  name={recette.name}
                  ingredients={recette.ingredients}
                  etapes={recette.etapes}
                  image={recette.image}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes;
