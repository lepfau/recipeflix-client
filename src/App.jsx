import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Recipes from "./pages/Recipes";
import OneRecipe from "./components/OneRecipe";
import FormCreate from "./components/Forms/FormCreate";
import Desserts from "./pages/Desserts";
import Plats from "./pages/Plats";
import Snacks from "./pages/Snacks";
import Entrees from "./pages/Entrees";
import { AnimatedSwitch } from "react-router-transition";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <NavMain />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/desserts" component={Desserts} />
          <Route exact path="/plats" component={Plats} />
          <Route exact path="/snacks" component={Snacks} />
          <Route exact path="/entrees" component={Entrees} />
          <Route exact path="/recipes/create" component={FormCreate} />
          <Route exact path="/recipes/:id" component={OneRecipe} />
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
