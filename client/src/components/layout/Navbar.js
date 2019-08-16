import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <Link className="navbar-brand mr-auto mr-lg-0" to="/">
          VoteSyS
        </Link>
      </nav>
    </Fragment>
  );
};

export default Navbar;
