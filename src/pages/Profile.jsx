import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import Recipe from "../components/Recipe";

const Profile = (props) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    apiHandler
      .getRecipes()
      .then((resp) => {
        console.log(props.context.user._id);
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
      <h2 style={{ color: "white" }}>Mes recettes ajoutées</h2>
      {recipes
        .filter((rec) => rec.id_user._id === props.context.user._id)
        .map((recette) => {
          return (
            <div style={{ display: "flex" }}>
              <Recipe
                key={recette._id}
                name={recette.name}
                image={recette.image}
                id={recette._id}
                type={recette.type}
                temps={recette.temps}
              />
              <p
                onClick={() => handleDelete(recette._id)}
                style={{ color: "white" }}
              >
                Supprimer
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default withUser(Profile);
