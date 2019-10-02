import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
            <Link to="/">To Home</Link>
          </div>
          <div>
            <Link to="/login">To login</Link>
          </div>
          <div>
            <Link to="/register">To register</Link>
          </div>
        </header>
        <Switch>
          <Route exact path="/" render={Home} />
          <Route exact path="/login" render={Login} />
          <Route exact path="/register" render={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
