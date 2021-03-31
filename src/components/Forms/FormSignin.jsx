import React, { Component } from "react";
import { UserContext } from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { Redirect } from "react-router-dom";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1 className="recettes-title">Se connecter</h1>
        <div className="signup-form-container">
          <form
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            className="signup-form"
          >
            <div className="signup-form-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="signup-form-field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
            </div>
            <button className="btn-sign">Connexion</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FormSignin);
