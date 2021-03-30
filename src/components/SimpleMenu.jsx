import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="menuitems">
      <NavLink exact to="/recipes">
        <MenuItem onClick={handleClose}>Toutes les recettes</MenuItem>
      </NavLink>
      <NavLink exact to="/recipes/entrees">
        <MenuItem onClick={handleClose}>Entrées</MenuItem>
      </NavLink>
      <NavLink exact to="/recipes/plats">
        <MenuItem onClick={handleClose}>Plats</MenuItem>
      </NavLink>
      <NavLink exact to="/recipes/desserts">
        {" "}
        <MenuItem onClick={handleClose}>Desserts</MenuItem>
      </NavLink>
      <NavLink exact to="/recipes/snacks">
        <MenuItem onClick={handleClose}>Snacks</MenuItem>
      </NavLink>
    </div>
  );
}
