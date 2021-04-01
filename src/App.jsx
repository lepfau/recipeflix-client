import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import RecipesPage from "./pages/RecipesPage";
import OneRecipe from "./components/OneRecipe";
import FormCreate from "./components/Forms/FormCreate";
import Desserts from "./pages/Desserts";
import Plats from "./pages/Plats";
import Snacks from "./pages/Snacks";
import Entrees from "./pages/Entrees";
import UserSettings from "./pages/UserSettings";
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
          <Route exact path="/recipes" component={RecipesPage} />
          <Route exact path="/recipes/desserts" component={Desserts} />
          <Route exact path="/recipes/plats" component={Plats} />
          <Route exact path="/recipes/snacks" component={Snacks} />
          <Route exact path="/recipes/entrees" component={Entrees} />
          <ProtectedRoute exact path="/create" component={FormCreate} />
          <Route exact path="/recipes/:id" component={OneRecipe} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route exact path="/profile/update" component={UserSettings} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
