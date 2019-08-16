import React, { Component } from "react";
import api from "../../services/api";
import Table from "./Table";

export default class Opened extends Component {
  state = {
    polls: []
  };

  componentDidMount() {
    this.loadPolls();
  }

  loadPolls = async () => {
    const res = await api.get("/polls/list/next");
    const polls = [];

    res.data.map((poll, index) => {
      return polls.push(poll);
    });

    this.setState({ polls });
  };

  render() {
    return <Table polls={this.state.polls} color="secondary" />;
  }
}
