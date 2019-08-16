import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import "./App.css";
import Home from "./components/polls/Home";
import CreatePolls from "./components/polls/CreatePolls";
import Poll from "./components/polls/Poll";

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <main role="main" className="container">
        <Route exact path="/" component={Home} />
        <Switch>
          <Route exact path="/criar-enquete" component={CreatePolls} />
          <Route exact path="/enquete/:id" component={Poll} />
        </Switch>
      </main>
    </Fragment>
  </Router>
);

export default App;
