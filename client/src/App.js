import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import PollsList from "./components/layout/PollsList";

const App = () => (
  <Fragment>
    <Navbar />
    <main role="main" className="container">
      <PollsList />
    </main>
  </Fragment>
);

export default App;
