import React, { Component } from "react";
import styles from "./dashboard-style.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      tableId: "",
      username: "",
      tables: [],
    };
    alert("hello");
    this.compare = this.compare.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  compare(a, b) {
    const firstTable = a.id;
    const secondTable = b.id;
    let comparision = 0;
    if (firstTable > secondTable) {
      comparision = 1;
    } else if (firstTable < secondTable) {
      comparision = -1;
    }
    return comparision;
  }

  componentDidMount() {
    // const {username} = this.props.location.state;
    axios
      .get(`http://localhost:8000/api/tables/`)
      .then((response) => {
        this.setState({ tables: response.data });
      })
      .catch(console.log);
  }

  handleSubmit(id) {
    const { username } = this.props.location.state;
    this.setState({ tableId: id, username });
    axios
      .get(`http://localhost:8000/api/table/${id}/join/${username}/`)
      .then((response) => {
        // if (response.data.status === 'ok') {
        setTimeout(() => {
          this.setState({ redirect: true });
        }, 2000);
        // }
      })
      .catch(console.log);

    // setTimeout(() => {
    //     this.setState({redirect: true})
    // }, 1000);
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/table:${this.state.tableId}`,
            state: {
              username: this.state.username,
              tableId: this.state.tableId,
            },
          }}
        />
      );
    }
    return (
      <div className={styles.wrapper}>
        <table className={styles.container}>
          <thead>
            <tr>
              <th>
                <h1>ID</h1>
              </th>
              <th>
                <h1>Type</h1>
              </th>
              <th>
                <h1>Players</h1>
              </th>
              <th>
                <h1>Average Stack</h1>
              </th>
              <th>
                <h1>Hands/Hour</h1>
              </th>
              <th>
                <h1></h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.tables.sort(this.compare).map((table, index) => (
              <tr key={index}>
                <td>{table.id}</td>
                <td>{table.table_type}</td>
                <td>{table.players_count}</td>
                <td>{table.average_stack}</td>
                <td>{table.hands_per_hour}</td>
                <td>
                  <button
                    type="submit"
                    className={styles.button}
                    onClick={() => this.handleSubmit(table.id)}
                  >
                    Join Table
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;
