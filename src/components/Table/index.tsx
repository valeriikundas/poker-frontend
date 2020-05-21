import React from "react";

import { useState, useEffect } from "react";
//import styles from "./table-style.css";
import Card from "../Card";
import Panel from "../ActionPanel";
//import axios from "axios";
import { makeStyles } from "@material-ui/core";
//import { getDefaultNormalizer } from "@testing-library/react";
import Player from "../Player";
import { ICards, IPlayer } from "../../types";

const useStyles = makeStyles({
  // * {
  //   margin: 0;
  //   padding: 0;
  // },

  body: {
    //  background: "#222",
  },

  container: {
    // display: "flex",
    // flexDirection: "column",
    // height: "100vh",
  },

  containerTable: {
    // display: "flex",
    // flexGrow: 4,
    // width: "75%",
    // margin: "0 auto",
    // paddingTop: "40px",
    // alignItems: "center",
  },

  panel: {
    // display: "flex",
    // flexGrow: 1,
    // width: "100%",
    // backgroundColor: "#2433334d",
  },

  table: {
    // flex: 1,
    // height: "60vh",
    // backgroundImage:
    //   "radial-gradient(rgba(78, 76, 78, 0.89), rgba(22, 20, 22, 0.87))",
    // borderRadius: "220px",
    // boxShadow:
    //   "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #0ff, 0 0 80px #0ff, 0 0 90px #0ff",
  },

  cardsArea: {
    // border: "3px dashed #86c5cf40",
    // display: "flex",
    // flexWrap: "wrap",
    // position: "absolute",
    // borderRadius: "10px",
    // padding: "10px",
    // top: "47%",
    // left: "50%",
    // transform: "translateX(-50%) translateY(-50%)",
    // boxSizing: "border-box",
  },

  playerArea: {
    // position: "relative",
    // width: "100%",
    // height: "100%",
    // zIndex: 100,
  },
});

const Table: React.FC = () => {
  const classes = useStyles();

  const [currentPlayerPosition, setCurrentPlayerPosition] = React.useState(4);
  const [
    currentPlayerCards,
    setCurrentPlayerCards,
  ] = React.useState<ICards | null>(null);

  const [players, setPlayers] = React.useState<IPlayer[]>([
    { name: "john", position: 1, username: "john", stack_size: 10000 },
    { name: "john", position: 2, username: "john", stack_size: 10000 },
    { name: "john", position: 3, username: "john", stack_size: 10000 },
    { name: "john", position: 4, username: "john", stack_size: 10000 },
    { name: "john", position: 5, username: "john", stack_size: 10000 },
    { name: "john", position: 6, username: "john", stack_size: 10000 },
  ]);
  console.log(players);

  const [event, setEvent] = React.useState();

  const [cardsOnTable, setCardsOnTable] = useState([]);
  const [call, setCall] = useState();

  const [actionPosition, setActionPosition] = React.useState(4);

  const [tableId, setTableId] = useState(123); //fixme:
  const [username, setUsername] = useState("username");
  const [actions, setActions] = useState([]);

  useEffect(() => {}, []);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: [], // consider this is data taken
  //     actions: [
  //       { type: "fold" },
  //       { type: "check" },
  //       { type: "call", size: 20 },
  //       { type: "raise", min: 50, max: 150 },
  //     ],
  //     actionPosition: 4,
  //     cardsOnTable: [], // add cards here from flop, turn, river events
  //     event: "",
  //     players: [], // taken from preflop
  //     currentPlayerPosition: 0, // taken from preflop
  //     currentPlayerCards: [], // taken from preflop
  //     isNewHand: false,
  //     handleState: 0,
  //     call: "",
  //   };
  //   this.username = this.props.location.state.username; //might cause some shit
  //   this.tableId = this.props.location.state.tableId;
  //   this.handleRiver = this.handleRiver.bind(this);
  //   this.handleTurn = this.handleTurn.bind(this);
  //   this.handleFlop = this.handleFlop.bind(this);
  //   this.handleActions = this.handleActions.bind(this);
  //   this.processEvents = this.processEvents.bind(this);
  //   this.getData = this.getData.bind(this);
  //   this.setCall = this.setCall.bind(this);
  // }
  // setCall(value) {
  //   this.setState({ call: value });
  //   console.log(this.state.call);
  // }
  // handleTurn(record) {
  //   this.setState({
  //     event: record.event,
  //     cardsOnTable: [...this.state.cardsOnTable, record.turn_card],
  //   });
  //   console.log(this.state.event);
  // }
  // handleRiver(record) {
  //   this.setState({
  //     event: record.event,
  //     cardsOnTable: [...this.state.cardsOnTable, record.river_card],
  //   });
  //   console.log(this.state.event);
  // }
  // handleFlop(record) {
  //   this.setState({
  //     event: record.event,
  //     cardsOnTable: record.flop_cards,
  //   });
  //   console.log(this.state.event);
  // }
  // handleActions(record) {
  //   this.setState({
  //     event: record.event,
  //     actions: record.current.action_space,
  //     actionPosition: record.current.position,
  //   });
  //   console.log(this.state.event);
  // }
  // processEvents(response) {
  //   try {
  //     response.map((record) => {
  //       if (record.event === "preflop") {
  //         this.setState({
  //           event: record.event,
  //           players: record.players,
  //           currentPlayerPosition: record.current.position,
  //           currentPlayerCards: record.current.cards,
  //         });
  //         console.log(this.state.event);
  //       }
  //       if (record.event === "flop_cards") {
  //         setTimeout(() => {
  //           this.handleFlop(record);
  //         }, 2000);
  //       }
  //       if (record.event === "turn_card") {
  //         setTimeout(() => {
  //           this.handleTurn(record);
  //         }, 4000);
  //       }
  //       if (record.event === "river_card") {
  //         setTimeout(() => {
  //           this.handleRiver(record);
  //         }, 6000);
  //       }
  //       if (record.event === "request_action") {
  //         this.handleActions(record);
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const getData = React.useCallback(() => {
    console.log(username, tableId);
    //let handleState = this.state.handleState;
    // axios
    //   .get(`http://localhost:8000/api/messages/${tableId}/${username}/`)
    //   .then((response) => {
    //     //  this.processEvents(response.data.slice(handleState, handleState + 5));
    //     //this.setState({ handleState: handleState + 5 });
    //   })
    //   .catch(console.log);
  }, [username, tableId]);

  React.useEffect(() => {
    getData();
    // let interval = setInterval(() => {
    //   getData();
    // }, 2000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, [getData]);

  return (
    <div>
      {/* className={classes.container}> */}
      <div>
        {/* className={classes.containerTable}> */}
        <div>
          {/* className={classes.table}> */}
          {event !== "preflop" && event !== "" && (
            <div className={classes.cardsArea}>
              {cardsOnTable.map((card, index) => (
                <Card value={card[0]} suitProp={card[1]} key={index} />
              ))}
            </div>
          )}
          <div className={classes.playerArea}>
            {players.map((player: IPlayer, index: number) => (
              <Player
                player={player}
                currentPlayerPosition={currentPlayerPosition}
                currentPlayerCards={currentPlayerCards}
                position={player.position}
                key={player.position}
                value={call}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={classes.panel}>
        {event === "request_action" &&
          currentPlayerPosition === actionPosition && (
            <Panel
              actions={actions}
              tableId={tableId}
              username={username}
              setCall={setCall}
            />
          )}
      </div>
    </div>
  );
};

export default Table;
