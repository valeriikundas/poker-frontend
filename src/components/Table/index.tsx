import React from "react";

import { useState, useEffect } from "react";
//import styles from "./table-style.css";
import Card from "../Card";
//import axios from "axios";
import { makeStyles, Button, TextField } from "@material-ui/core";
//import { getDefaultNormalizer } from "@testing-library/react";
import Player from "../Player";
import { ICard, IPlayer, IPocketHand, IRequestAction } from "../../types";
import ActionPanel from "../ActionPanel";
import API from "../../api";
import axios from "axios";

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
    display: "flex",
  },
});

const Table: React.FC = () => {
  const classes = useStyles();

  const [currentPlayerPosition, setCurrentPlayerPosition] = React.useState(4); // taken from preflop
  const [
    currentPlayerCards,
    setCurrentPlayerCards,
  ] = React.useState<IPocketHand | null>([
    { suit: "diamonds", value: "9" },
    { suit: "clubs", value: "6" },
  ]); // taken from preflop

  const [players, setPlayers] = React.useState<IPlayer[]>([]);
  // taken from preflop

  const [event, setEvent] = React.useState("");

  const [cardsOnTable, setCardsOnTable] = useState<ICard[]>([]);
  const [call, setCall] = useState();

  const [actionPosition, setActionPosition] = React.useState(4);

  const [tableId, setTableId] = useState(1); //fixme:
  const [username, setUsername] = useState("");
  const [actions, setActions] = useState<IRequestAction[]>([
    { type: "fold" },
    { type: "check" },
    { type: "call", size: 20 },
    { type: "raise", min: 50, max: 150 },
  ]);

  const [pot, setPot] = useState(0);

  const [isPlayer, setIsPlayer] = useState(false);

  const refreshPlayers = async () => {
    const response = await axios.get("http://localhost:5000/api/tables/1/");
    setPlayers(response.data["players"]);
  };

  useEffect(() => {
    refreshPlayers();

    setCardsOnTable([
      { value: "9", suit: "spades" },
      { value: "T", suit: "diamonds" },
      { value: "2", suit: "hearts" },
      { value: "A", suit: "clubs" },
    ]);
  }, []);

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

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
  };

  const onJoinTableClick = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/tables/${tableId}/join/${username}/`
    );
    console.log("join table ", response.data);
    setIsPlayer(true);
    refreshPlayers();
    //todo: subscribe #2 to socketio
  };

  const onLeaveTableClick = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/tables/${tableId}/leave/${username}/`
    );
    console.log("join table ", response.data);
    setIsPlayer(false);
    refreshPlayers();
    //todo: subscribe #2 to socketio
  };

  return (
    <div className={classes.container}>
      <TextField
        value={username}
        onChange={onUsernameChange}
        // disabled={isPlayer}todo:make disabled when game is going
      ></TextField>
      <Button onClick={onJoinTableClick}>Join</Button>
      <Button onClick={onLeaveTableClick}>Leave</Button>

      <div className={classes.containerTable}>
        <div className={classes.table}>
          <div>{pot}</div>

          {/* {event !== "preflop" && event !== "" && ( */}
          <div className={classes.cardsArea}>
            {cardsOnTable.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </div>
          {/* )} */}

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
        {
          // event === "request_action" &&
          // currentPlayerPosition === actionPosition &&
          <ActionPanel
            actions={actions}
            tableId={tableId}
            username={username}
            setCall={setCall}
          />
        }
      </div>
    </div>
  );
};

export default Table;
