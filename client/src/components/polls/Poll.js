import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

class Poll extends Component {
  constructor(req) {
    super();
    this.state = { id: req.match.params.id, poll: [], options: [] };
  }

  componentDidMount() {
    this.loadPoll();
  }

  loadPoll = async () => {
    const poll = await api.get(`/polls/get/${this.state.id}`);
    this.setState({ poll: poll.data, options: poll.data.options });
  };

  // Verifica se já não expirou a votação
  isOverdue() {}

  render() {
    const { title } = this.state.poll;

    return (
      <Fragment>
        <div className="d-flex justify-content-end mt-3">
          <Link to="/" className="btn btn-secondary">
            Listar Enquetes
          </Link>
          <Link to="editar-enquete" className="btn btn-warning ml-2">
            Editar
          </Link>
        </div>

        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h2 className="my-3 border-bottom border-gray pb-3">{title}</h2>

          <form action="">
            {this.state.options.map((option, index) => {
              return (
                <div className="form-check" key={option._id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="options"
                    id={"exampleRadios" + index}
                    value={option._id}
                  />
                  <label
                    className="form-check-label"
                    for={"exampleRadios" + index}
                  >
                    {option.title}
                    <span className="badge badge-light">{option.votes}</span>
                  </label>
                </div>
              );
            })}

            <button className="mt-3 btn btn-success">Salvar</button>
          </form>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <a href="index.html" className="btn btn-danger ml-2">
            Excluir
          </a>
        </div>
      </Fragment>
    );
  }
}

export default Poll;
