import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import { withRouter } from "react-router-dom";

class FormCreate extends Component {
  state = {
    name: "",
    ingredients: "",
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
          ingredients: "",
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

  render() {
    return (
      <div className="formcontainer">
        <form onSubmit={this.handleSubmit} className="formcreate">
          <label htmlFor="name">Recipe Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          ></input>
          <label htmlFor="ingredients">Ingredients</label>
          <input
            id="ingredients"
            name="ingredients"
            type="text"
            onChange={this.handleChange}
            value={this.state.ingredients}
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
      </div>
    );
  }
}

export default withRouter(FormCreate);
