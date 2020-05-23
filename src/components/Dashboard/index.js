import React, { Component } from "react";
import "./dashboard-style.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";

// class useStyles = makeStyles({});
// "body":
// {"fontFamily":"'Open Sans', sans-serif","color":"#A7A1AE","background":"#222"},
// "wrapper":{"display":"flex","justifyContent":"center","alignItems":"center","height":"100vh"},
// "table":
// {"borderRadius":"20px","boxShadow":"0 0 5px #fff,\n  0 0 10px #fff,\n  0 0 20px #fff,\n  0 0 40px #0c8787,\n  0 0 60px #0ff"},
// "h1":{"fontSize":"3em","fontWeight":"300","lineHeight":"1em","textAlign":"center","color":"#00FFFF"},
// "h2":{"fontSize":"1em","fontWeight":"300","textAlign":"center","display":"block","lineHeight":"1em","paddingBottom":"2em","color":"#00FFFF"},
// "h2_a":{"fontWeight":"700","textTransform":"uppercase","color":"#00FFFF","textDecoration":"none"},"blue":{"color":"#185875"},"yellow":{"color":"#22fff0"},
// "container_th_h1":{"fontWeight":"bold","fontSize":"1em","textAlign":"left","color":"#A8FFE5"},"container_td":{"padding":"1%"},
// "container":{"textAlign":"left","overflow":"hidden","width":"80%","margin":"0 auto","display":"table"},"container_th":{"backgroundColor":"#083439"},
// "container_tr_nth_child_odd":{"backgroundColor":"#257d83"},"container_tr_nth_child_even":{"backgroundColor":"#12595e"},"container_td_first_child":{"color":"#d6eeef"},
// "container_tr_hover":{"backgroundColor":"#004a52","WebkitBoxShadow":"0 6px 6px -6px #0E1119","MozBoxShadow":"0 6px 6px -6px #0E1119","boxShadow":"0 6px 6px -6px #0E1119"},
// "container_td_hover":{"backgroundColor":"#11d9cb","color":"#134037","fontWeight":"bold","boxShadow":"#0f7f6c -1px 1px, #0a7f73 -2px 2px, #0d7f74 -3px 3px, #057f76 -4px 4px, #0d7f74 -5px 5px, #0d7f74 -6px 6px","transform":"translate3d(6px, -6px, 0)","transitionDelay":"0s","transitionDuration":"0.4s","transitionProperty":"all","transitionTimingFunction":"line"},
// "@media (max-width: 800px)":{"__expression__":"(max-width: 800px)","container_td_nth_child_4":{"display":"none"},
// "container_th_nth_child_4":{"display":"none"}},"button":{"background":"rgba(255, 255, 255, .1)","border":"1px solid","padding":"15px 5px","borderRadius":"25px","width":"80%","color":"#fff","display":"block"}
// });

// const A={
//   const classes=useStyles();
// }

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
