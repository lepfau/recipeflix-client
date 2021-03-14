import React from "react";
import { NavLink } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import { withRouter } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
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
    );
  }
}

export default withRouter(Home);
