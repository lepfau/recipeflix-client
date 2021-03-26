import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import Recipe from "../components/Recipe";

const Profile = (props) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    apiHandler
      .getUserRecipe(props.context.user._id)
      .then((resp) => {
        console.log(resp);
        setRecipes(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDelete(itemId) {
    apiHandler.deleteRecipe(itemId).then(() => {
      setRecipes(recipes.filter((it) => it._id !== itemId));
    });
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
                />
              </div>
              <i
                class="fas fa-trash"
                style={{
                  color: "white",
                  cursor: "pointer",
                  marginBottom: "20px",
                  marginTop: "15px",
                }}
                onClick={() => handleDelete(recette._id)}
              ></i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withUser(Profile);
