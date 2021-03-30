import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import apiHandler from "../api/apiHandler";
import Recipe from "../components/Recipe";

function Home(props) {
  const [lastthree, setLastthree] = useState([]);
  useEffect(() => {
    apiHandler
      .getRecipes()
      .then((resp) => {
        setLastthree(resp.slice(Math.max(resp.length - 5, 1)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <motion.div exit={{ opacity: 0 }}>
      <div className="wholehomepage">
        <div className="homepage">
          <h2 className="recettes-title">App Recettes ∆ </h2>

          <h3 className="homepage-subtitle">Les dernières recettes ajoutées</h3>
          <div className="recipe-container">
            {lastthree.map((recette) => {
              return (
                <Recipe
                  key={recette._id}
                  name={recette.name}
                  image={recette.image}
                  id={recette._id}
                  type={recette.type}
                  temps={recette.temps}
                  ratings={recette.ratings}
                />
              );
            })}
          </div>
          <div className="homepage-links">
            <NavLink to="/recipes" className="homepage-link">
              Les recettes
            </NavLink>
            <NavLink to="/create" className="homepage-link">
              Ajouter une recette
            </NavLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default withRouter(Home);
