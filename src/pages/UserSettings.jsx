import React, { useState, useEffect, useReducer } from "react";
import apiHandler from "../api/apiHandler";

function UserSettings() {
  const [user, setUser] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {}
  );
  useEffect(() => {
    apiHandler.getUserProfile().then((resp) => {
      console.log(resp);
      setUser(resp);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    apiHandler.updateUser(user._id, user).then(() => {
      console.log("updated !");
    });
  }

  function handleChange(event) {
    const name = event.target.name;
    const newValue = event.target.value;
    setUser({ [name]: newValue });
  }

  return (
    <div>
      <h1>user update</h1>
      <div className="signup-form-container">
        <form onSubmit={(event) => handleSubmit(event)} className="signup-form">
          <div className="signup-form-field">
            <label htmlFor="username">Pseudo</label>
            <input
              onChange={handleChange}
              type="text"
              name="userName"
              defaultValue={user.userName}
            ></input>
          </div>

          <div className="signup-form-field">
            <label htmlFor="username">Mot de passe</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
            ></input>
          </div>
          <div className="signup-form-field">
            <label htmlFor="username">Prénom</label>
            <input
              onChange={handleChange}
              type="text"
              name="firstName"
              defaultValue={user.firstName}
            ></input>
          </div>
          <div className="signup-form-field">
            <label htmlFor="username">Nom</label>
            <input
              onChange={handleChange}
              type="text"
              name="lastName"
              defaultValue={user.lastName}
            ></input>
          </div>
          <button>Modifier le profil</button>
        </form>
      </div>
    </div>
  );
}

export default UserSettings;
