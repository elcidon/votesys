import React, { Fragment } from "react";
import Opened from "../polls/Opened";
import Closed from "../polls/Closed";
import NextPolls from "../polls/NextPolls";
const PollsList = () => {
  return (
    <Fragment>
      {/* BEGIN BOTÃO ADICIONAR ENQUETE  */}
      <div className="d-flex justify-content-end mt-3">
        <a href="cadastro.html" className="btn btn-success">
          Adicionar Enquete
        </a>
      </div>
      {/* END BOTÃO ADICIONAR ENQUETE  */}

      {/* BEGIN TAB */}
      <div className="my-3">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="open-polls-tab"
              data-toggle="tab"
              href="#open-polls"
              role="tab"
              aria-controls="open-polls"
              aria-selected="true"
            >
              Enquetes Abertas
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Enquetes Fechadas
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="open-polls"
            role="tabpanel"
            aria-labelledby="open-polls-tab"
          >
            {/* <!-- BEGIN ENQUETES EM ABERTO --> */}
            <Opened />
            {/* <!-- END ENQUETES EM ABERTO --> */}
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {/* <!-- BEGIN ENQUETES FECHADAS --> */}
            <Closed />
            {/* <!-- END ENQUETES FECHADAS --> */}
          </div>
        </div>
      </div>
      {/* END TAB */}

      <NextPolls />
    </Fragment>
  );
};

export default PollsList;
