import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";

function MenuProfile(props) {
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <li onClick={handleClick}>Profil</li>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <NavLink exact to="/profile">
          <MenuItem onClick={handleClose}>Mon profil</MenuItem>
        </NavLink>
        <NavLink exact to="/profile/update">
          <MenuItem onClick={handleClose}>Modifier mes infos</MenuItem>
        </NavLink>
        <MenuItem onClick={handleClose}>
          <p onClick={handleLogout}>Déconnexion</p>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default withUser(MenuProfile);
