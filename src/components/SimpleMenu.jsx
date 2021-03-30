import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";

export default function SimpleMenu(props) {
  return (
    <div className="menuitems">
      <NavLink exact to="/recipes">
        <MenuItem>Toutes les recettes</MenuItem>
      </NavLink>
      <NavLink exact to="/recipes/entrees">
        <MenuItem>Entrées</MenuItem>
      </NavLink>
      <NavLink exact to="/recipes/plats">
        <MenuItem>Plats</MenuItem>
      </NavLink>
      <NavLink exact to="/recipes/desserts">
        {" "}
        <MenuItem>Desserts</MenuItem>
      </NavLink>
      <NavLink exact to="/recipes/snacks">
        <MenuItem>Snacks</MenuItem>
      </NavLink>
    </div>
  );
}
