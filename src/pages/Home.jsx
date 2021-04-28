import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import apiHandler from "../api/apiHandler";
import Recipe from "../components/Recipe";
import recipeflix from "../assets/recipeflix.png";
import netflix from "../assets/netflixintro.mp3";
import useSound from "use-sound";

function Home(props) {
  const [lastthree, setLastthree] = useState([]);
  const [play] = useSound(netflix);

  useEffect(() => {
    apiHandler
      .getRecipes()
      .then((resp) => {
        setLastthree(resp.slice(Math.max(resp.length - 4, 1)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <motion.div exit={{ opacity: 0 }}>
      <div className="wholehomepage">
        <div className="homepage">
          <img
            className="homepage-title"
            src={recipeflix}
            alt="recipeflixlogo"
          />
          {lastthree.length > 3 && (
            <h3 className="homepage-subtitle">
              Les dernières recettes ajoutées
            </h3>
          )}

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
            <NavLink onClick={play} to="/recipes" className="homepage-link">
              Voir les recettes
            </NavLink>
            <NavLink to="/create" className="homepage-link">
              Proposer une recette
            </NavLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default withRouter(Home);
