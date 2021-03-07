import React from "react";
import FormCreate from "../components/Forms/FormCreate";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>
          Welcome to Recipee App! ∆{" "}
          <img
            alt="vegetables"
            src="https://wallpaperaccess.com/full/1306571.jpg"
          />
        </h2>
        <FormCreate />
      </div>
    );
  }
}

export default Home;
