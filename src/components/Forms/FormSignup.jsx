import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { Redirect } from "react-router-dom";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1 className="recettes-title">Créer un compte</h1>
        <div className="signup-form-container">
          <form onSubmit={this.handleSubmit} className="signup-form">
            <div className="signup-form-field">
              <label htmlFor="email">Email*</label>
              <input
                className="sign-form-input"
                onChange={this.handleChange}
                value={this.state.email}
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div className="signup-form-field">
              <label htmlFor="password">Password*</label>
              <input
                className="sign-form-input"
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
                id="password"
                name="password"
              />
            </div>
            <div className="signup-form-field">
              <label htmlFor="firstName">Prénom</label>
              <input
                className="sign-form-input"
                onChange={this.handleChange}
                value={this.state.firstName}
                type="text"
                id="firstName"
                name="firstName"
              />
            </div>
            <div className="signup-form-field">
              <label htmlFor="lastName">Nom</label>
              <input
                className="sign-form-input"
                onChange={this.handleChange}
                value={this.state.lastName}
                type="text"
                id="lastName"
                name="lastName"
              />
            </div>
            <div className="signup-form-field">
              <label htmlFor="userName">Pseudo*</label>
              <input
                className="sign-form-input"
                onChange={this.handleChange}
                value={this.state.userName}
                type="text"
                id="userName"
                name="userName"
              />
            </div>
            <p style={{ margin: "20px" }}>* Champs obligatoires</p>
            <button className="btn-sign">S'enregistrer</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FormSignup);
