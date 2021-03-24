import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
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
    <div className="dropdownmenu">
      <Button
        className="btn-menu"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Catégories
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <NavLink exact to="/recipes">
          <MenuItem onClick={handleClose}>Toutes les recettes</MenuItem>
        </NavLink>
        <NavLink exact to="/plats">
          <MenuItem onClick={handleClose}>Plats</MenuItem>
        </NavLink>
        <NavLink exact to="/desserts">
          {" "}
          <MenuItem onClick={handleClose}>Desserts</MenuItem>
        </NavLink>
        <NavLink exact to="/snacks">
          <MenuItem onClick={handleClose}>Snacks</MenuItem>
        </NavLink>
      </Menu>
    </div>
  );
}
