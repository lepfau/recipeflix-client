import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";
class Home extends React.Component {
  render() {
    return (
      <motion.div exit={{ opacity: 0 }}>
        <div className="wholehomepage">
          <div className="homepage">
            <h2 className="homepage-title">App Recettes ∆ </h2>

            <div className="homepage-links">
              <NavLink to="/recipes" className="homepage-link">
                Les recettes
              </NavLink>
              <NavLink to="/recipes/create" className="homepage-link">
                Ajouter une recette
              </NavLink>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default withRouter(Home);
