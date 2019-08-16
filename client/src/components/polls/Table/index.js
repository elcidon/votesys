import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

class Table extends Component {
  renderTableHead() {
    return (
      <tr>
        <th scope="col" width="5%" />
        <th scope="col" width="40%" />
        <th scope="col" width="20%">
          Início
        </th>
        <th scope="col" width="20%">
          Término
        </th>

        <th scope="col" width="10%" />
      </tr>
    );
  }

  renderTableBody() {
    return this.props.polls.map((poll, index) => {
      const { _id, title, start, end } = poll;
      const color = this.props.color;
      return (
        <tr key={_id}>
          <th>{index + 1}</th>
          <td>{title}</td>
          <td>
            <span className="badge badge-secondary">
              {moment.utc(start).format("DD/MM/YYYY")}
            </span>
          </td>
          <td>
            <span className={"badge badge-" + color}>
              {moment.utc(end).format("DD/MM/YYYY")}
            </span>
          </td>
          <td>
            <Link to={"/enquete/" + poll._id} className="badge badge-primary">
              Ver
            </Link>
          </td>
        </tr>
      );
    });
  }
  render() {
    if (this.props.polls.length === 0) {
      return (
        <div className="mb-3 p-3 bg-white rounded shadow-sm text-center">
          <h3>Nenhuma enquete para exibir, champs :)</h3>
        </div>
      );
    } else {
      return (
        <div className="mb-3 p-3 bg-white rounded shadow-sm">
          <table className="table text-secondary table-hover table-borderless table-striped  text-sm">
            <thead>{this.renderTableHead()}</thead>
            <tbody>{this.renderTableBody()}</tbody>
          </table>
        </div>
      );
    }
  }
}
export default Table;
