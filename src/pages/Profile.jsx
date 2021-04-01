import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import Recipe from "../components/Recipe";

const Profile = (props) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    apiHandler
      .getUserProfile()
      .then((resp) => {
        console.log(resp);
        setRecipes(resp.id_recipes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDelete(recipeId) {
    apiHandler.deleteRecipe(recipeId).then(() => {
      apiHandler.deleteAllRates(recipeId);
    });

    setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
  }

  return (
    <div>
      <h1 className="recettes-title">Mon profil</h1>
      <h2 style={{ color: "white", marginBottom: "40px" }}>
        Mes recettes ajoutées
      </h2>
      <div className="recipe-container" style={{ marginLeft: "50px" }}>
        {recipes.map((recette) => {
          return (
            <div
              key={recette._id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex" }} key={recette._id}>
                <Recipe
                  key={recette._id}
                  name={recette.name}
                  image={recette.image}
                  id={recette._id}
                  type={recette.type}
                  temps={recette.temps}
                  ratings={recette.ratings}
                />
              </div>
              <i
                onClick={() => handleDelete(recette._id)}
                className="fas fa-trash"
                style={{
                  color: "white",
                  cursor: "pointer",
                  marginBottom: "20px",
                  marginTop: "15px",
                }}
              ></i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withUser(Profile);
