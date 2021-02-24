import React, { Component } from 'react'
import apiHandler from "../../api/apiHandler"
import { buildFormData } from "../../utils"
import { withRouter } from "react-router-dom";

class FormCreate extends Component {

state = {
    name: "",
    httpResponse: null,
    error: null,
}



handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({[key] : value})
}

handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
    .createRecipee(this.state)
    .then((data) => {
 
      this.setState({
        name: "",
     
               
        httpResponse: {
          status: "success",
          message: "Item successfully added.",
        },
        

      })
   
      this.timeoutId = setTimeout(() => {
        this.setState({ httpResponse: null });
      }, 1000);
    })
    .catch((error) => {
        console.log(error)
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name"></label>
                    <input id="name" name="name" type="text" onChange={this.handleChange} value={this.state.name}></input>
                    <button className="btn-submit-plant">Add Plant</button>
                </form>
            </div>
        )
    }
}

export default withRouter (FormCreate);

