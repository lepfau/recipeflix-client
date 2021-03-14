import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import { withRouter } from "react-router-dom";
import CreateIngredients from "./CreateIngredients";
import CreateEtapes from "./CreateEtapes";

class FormCreate extends Component {
  state = {
    name: "",
    ingredients: [],
    image: "",
    vegan: false,
    vegetarian: false,
    gluten: false,
    lactose: false,
    httpResponse: null,
    error: null,
    etapes: [],
  };

  handleChange = (event) => {
    event.preventDefault();
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

  handleEtapes = (data) => {
    let ing = [...this.state.etapes];
    this.setState({
      etapes: [...ing, data],
    });
  };

  handleCheck = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.checked,
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

  handleRemoveSteps = (ing) => {
    console.log(ing);
    let filtered = [...this.state.etapes];
    let final = filtered.filter((item) => item !== ing);
    this.setState({
      etapes: final,
    });
  };

  render() {
    return (
      <div className="formcontainer">
        <form>
          <label htmlFor="name">Nom</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          ></input>
        </form>
        <form className="container-vegan">
          <div>
            <h2>Spécificités</h2>
          </div>
          <div>
            <div className="labelinput-vegan">
              <label htmlFor="vegan">Vegan</label>
              <input
                onChange={this.handleCheck}
                type="checkbox"
                name="vegan"
                id="vegan"
              ></input>
            </div>
            <div className="labelinput-vegan">
              <label htmlFor="vegetarian">Vegetarian</label>
              <input
                onChange={this.handleCheck}
                type="checkbox"
                name="vegetarian"
                id="vegetarian"
              ></input>
            </div>
            <div className="labelinput-vegan">
              <label htmlFor="gluten">Sans Gluten</label>
              <input
                onChange={this.handleCheck}
                type="checkbox"
                name="gluten"
                id="gluten"
              ></input>
            </div>
            <div className="labelinput-vegan">
              <label htmlFor="lactos">Sans Lactose</label>
              <input
                onChange={this.handleCheck}
                type="checkbox"
                name="lactose"
                id="lactose"
              ></input>
            </div>
          </div>
        </form>

        <CreateIngredients handleIngredients={this.handleIngredients} />

        {this.state.ingredients ? (
          this.state.ingredients.map((ing, index) => {
            return (
              <div key={index}>
                <p>{ing[0].toUpperCase() + ing.substring(1)}</p>
                <button onClick={() => this.handleRemove(ing)}>retirer</button>
              </div>
            );
          })
        ) : (
          <h1>YOOO</h1>
        )}
        <ol style={{ marginLeft: "50px" }}>
          <CreateEtapes handleEtapes={this.handleEtapes} />
          {this.state.etapes ? (
            this.state.etapes.map((ing, index) => {
              return (
                <div key={index}>
                  <li>{ing[0].toUpperCase() + ing.substring(1)}</li>
                  <button onClick={() => this.handleRemoveSteps(ing)}>
                    retirer
                  </button>
                </div>
              );
            })
          ) : (
            <div>
              <p>pas d'ingredients pour le moment</p>
            </div>
          )}
        </ol>
        <form>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={this.handleChange}
          ></input>
        </form>
        <button onClick={this.handleSubmit}>Enregistrer</button>
      </div>
    );
  }
}

export default withRouter(FormCreate);
