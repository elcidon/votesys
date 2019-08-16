import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import api from "../../services/api";

class CriarEnquete extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { title, start, end } = event.target;
    // Monta array que vai ser enviado para a api
    let formData = [];

    const options = event.target.options;

    const arrOptions = [];
    for (let option of options) {
      arrOptions.push({ title: option.value });
    }

    formData = {
      title: title.value,
      start: start.value,
      end: end.value,
      options: arrOptions
    };

    const headers = {
      "Content-Type": "application/json"
    };

    await api
      .post("/polls/add", formData, { headers: headers })
      .then(res => {
        console.log(res);
      })
      .catch(err => {});

    // console.info(formData);
  }

  render() {
    return (
      <div>
        {/* BEGIN BOTÃO LISTAR ENQUETES  */}
        <div className="d-flex justify-content-end mt-3">
          <Link to="/" className="btn btn-secondary">
            Listar Enquetes
          </Link>
        </div>
        {/* END BOTÃO LISTAR ENQUETES  */}

        {/* <!-- BEGIN FORM BOX --> */}
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h3 className="pb-3 border-bottom border-gray">Cadastrar Enquete</h3>
          {/* <!-- BEGIN FORM --> */}
          <form onSubmit={this.handleSubmit}>
            {/* <!-- NOME DA ENQUETE --> */}
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                required
              />
            </div>

            {/* <!-- DT INICIO --> */}
            <div className="row">
              <div className="form-group col">
                <label htmlFor="start">Início</label>
                <input
                  type="date"
                  className="form-control"
                  id="start"
                  name="start"
                  required
                />
              </div>

              {/* <!-- DT TERMINO --> */}
              <div className="form-group col">
                <label htmlFor="end">Término</label>
                <input
                  type="date"
                  className="form-control"
                  id="end"
                  name="end"
                  required
                />
              </div>
            </div>

            {/* <!-- OPÇÕES --> */}
            <h6 className="text-muted font-weight-bold">Opções</h6>
            <div
              id="poll-options"
              className="rounded border border-gray p-3 my-2"
            >
              <div className="form-group ">
                <label htmlFor="option-1">Opção 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="option-1"
                  name="options"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="option-1">Opção 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="option-1"
                  name="options"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="option-1">Opção 3</label>
                <input
                  type="text"
                  className="form-control"
                  id="option-1"
                  name="options"
                  required
                />
              </div>
            </div>

            {/* <!-- SUBMIT BTN --> */}
            <button className="btn btn-success">Cadastrar</button>
          </form>
          {/* <!-- END FORM --> */}
        </div>
        {/* <!-- END FORM BOX --> */}
      </div>
    );
  }
}
export default CriarEnquete;
