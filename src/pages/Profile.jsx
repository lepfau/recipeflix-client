import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import Recipe from "../components/Recipe";

const Profile = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    apiHandler
      .getUserProfile()
      .then((resp) => {
        setRecipes(resp.id_recipes);
        setFavorites(resp.favorites);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDelete(recipeId) {
    apiHandler.deleteRecipe(recipeId).then(() => {
      apiHandler.deleteAllRates(recipeId);
      setFavorites(favorites.filter((fav) => fav._id !== recipeId));
    });

    setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
  }

  return (
    <div>
      <h1 className="recettes-title">Mon profil</h1>
      <div>
        <h2
          style={{ color: "white", marginBottom: "40px", marginLeft: "50px" }}
        >
          Mes recettes ajoutées
        </h2>
        <div className="recipe-container" style={{ marginLeft: "50px" }}>
          {recipes.length > 0 ? (
            recipes.map((recette) => {
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
                  <div
                    className="profilerecipes"
                    style={{ display: "flex" }}
                    key={recette._id}
                  >
                    <Recipe
                      key={recette._id}
                      name={recette.name}
                      image={recette.image}
                      id={recette._id}
                      type={recette.type}
                      temps={recette.temps}
                      ratings={recette.ratings}
                      id_user={recette.id_user}
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
            })
          ) : (
            <p style={{ color: "white" }}>
              Pas de recettes ajoutées pour le moment..
            </p>
          )}
        </div>
      </div>
      <div>
        <h2
          style={{ color: "white", marginBottom: "40px", marginLeft: "50px" }}
        >
          Mes recettes favorites
        </h2>
        <div className="recipe-container" style={{ marginLeft: "50px" }}>
          {favorites.length > 0 ? (
            favorites.map((recette) => {
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
            })
          ) : (
            <p style={{ color: "white" }}>
              Pas de recettes favorites pour le moment..
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default withUser(Profile);
