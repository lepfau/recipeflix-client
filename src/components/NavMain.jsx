import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import MenuProfile from "./MenuProfile";
import "../styles/NavMain.css";
import recipeflixlogo from "../assets/recipeflix.png";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="NavMain">
      <NavLink exact to="/">
        <img src={recipeflixlogo} alt="recipeflixlogo" className="logonav" />
      </NavLink>

      <ul className="nav-list">
        <li>
          <NavLink to="/recipes">Les Recettes</NavLink>
        </li>
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/create">Proposer une recette</NavLink>
            </li>
            <MenuProfile />
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin">Connexion</NavLink>
            </li>
            <li>
              <NavLink to="/signup">S'enregister</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
