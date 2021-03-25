import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import SimpleMenu from "./SimpleMenu";
import "../styles/NavMain.css";

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
        <p>Accueil</p>
      </NavLink>

      <ul className="nav-list">
        <li>
          <NavLink to="/recipes">Les Recettes</NavLink>
        </li>
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/create">Ajouter une recette</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Mon profil</NavLink>
            </li>
            <li>
              <p onClick={handleLogout}>Déconnexion</p>
            </li>
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
