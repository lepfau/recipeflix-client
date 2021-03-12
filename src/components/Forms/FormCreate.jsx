import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import { withRouter } from "react-router-dom";
import CreateIngredients from "./CreateIngredients";

class FormCreate extends Component {
  state = {
    name: "",
    ingredients: [],
    image: "",
    httpResponse: null,
    error: null,
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    this.setState({ [key]: value });
  };

  handleIngredients = (data) => {
    let ing = [...this.state.ingredients];
    this.setState({
      ingredients: [...ing, data],
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data);

    apiHandler
      .createRecipee(fd)
      .then((data) => {
        this.setState({
          name: "",
          ingredients: [],
          image: "",
          httpResponse: {
            status: "success",
            message: "Item successfully added.",
          },
        });

        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
        this.props.history.push("/recipes");
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          httpResponse: {
            status: "failure",
            message: "An error occured, try again later.",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      });
  };

  handleRemove = (ing) => {
    console.log(ing);
    let filtered = [...this.state.ingredients];
    let final = filtered.filter((item) => item !== ing);
    this.setState({
      ingredients: final,
    });
  };

  render() {
    return (
      <div
        className="formcontainer"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <form onSubmit={this.handleSubmit} className="formcreate">
          <label htmlFor="name">Recipe Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          ></input>
          <label htmlFor="image">Image</label>

          <input
            id="image"
            name="image"
            type="file"
            onChange={this.handleChange}
          ></input>
          <button className="btn-submit-plant">Add Recipe</button>
        </form>
        <CreateIngredients handleIngredients={this.handleIngredients} />

        {this.state.ingredients
          ? this.state.ingredients.map((ing) => {
              return (
                <div>
                  <p>{ing}</p>
                  <button onClick={() => this.handleRemove(ing)}>
                    retirer
                  </button>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default withRouter(FormCreate);
