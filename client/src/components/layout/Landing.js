import React, { Fragment } from "react";
import PollsList from "./PollsList";
const Landing = () => {
  return (
    <Fragment>
      <main role="main" className="container">
        <PollsList />
      </main>
    </Fragment>
  );
};

export default Landing;
