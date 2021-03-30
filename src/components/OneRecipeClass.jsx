import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import { motion } from "framer-motion";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export class OneRecipeClass extends Component {
  handleclick = () => {
    console.log(this.props.context.user._id);
  };

  render() {
    return (
      <div>
        <h1 onClick={this.handleclick}>RECIPES</h1>
      </div>
    );
  }
}

export default withUser(OneRecipeClass);
