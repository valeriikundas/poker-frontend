import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client";
import API from "../../api";
import { ICard, IPlayer, IPocketHand, IRequestAction } from "../../types";
import ActionPanel from "../ActionPanel";
import Card from "../Card";
//import { getDefaultNormalizer } from "@testing-library/react";
import Player from "../Player";
import useStyles from "./style";

const SOCKETIO_ENDPOINT = "http://localhost:5000/";

const Table: React.FC = () => {
  const classes = useStyles();

  // let { id: table_id } = useParams();

  const { state } = useLocation();
  console.log("state :>> ", state);

  const [currentPlayerPosition, setCurrentPlayerPosition] = React.useState(1); // taken from preflop
  const [
    currentPlayerCards,
    setCurrentPlayerCards,
  ] = React.useState<IPocketHand | null>([
    { suit: "diamonds", rank: "9" },
    { suit: "clubs", rank: "6" },
  ]); // taken from preflop

  const [players, setPlayers] = React.useState<IPlayer[]>([]);
  // taken from preflop

  const [event, setEvent] = React.useState("");

  const [cardsOnTable, setCardsOnTable] = useState<ICard[]>([]);
  const [call, setCall] = useState();

  const [actionPosition, setActionPosition] = React.useState(4);

  const [tableId, setTableId] = useState<number>(state.tableId);
  const [username, setUsername] = useState<string>(state.username);
  const [actions, setActions] = useState<IRequestAction[]>([
    { type: "fold" },
    { type: "check" },
    { type: "call", size: 20 },
    { type: "raise", min: 50, max: 150 },
  ]);

  const [pot, setPot] = useState(0);

  const [isPlayer, setIsPlayer] = useState(false);

  const [socketResponse, setSocketResponse] = useState("");

  const refreshPlayers = async () => {
    const response = await API.get("/tables/1/");
    setPlayers(response.data["players"]);
  };

  const convertStringToPocketHand = (cards: string): IPocketHand => {
    return [
      { suit: "spades", rank: "A" },
      { suit: "spades", rank: "J" },
    ];
  };

  useEffect(() => {
    refreshPlayers();

    // setCardsOnTable([
    //   { value: "9", suit: "spades" },
    //   { value: "T", suit: "diamonds" },
    //   { value: "2", suit: "hearts" },
    //   { value: "A", suit: "clubs" },
    // ]);

    //FIXME:: connect this
    const socket = socketIOClient(SOCKETIO_ENDPOINT);

    console.log("connecting to backend through socket");

    socket.emit("some-event", "hello world");

    socket.on("message1", (data: any) => {
      console.log("received socket message" + data);
      setSocketResponse(data.toString());
    });

    //main event handler
    socket.on("json", (data: any) => {
      console.log("received json :>> ", data);

      const event = data["event"];
      console.log("event", event);
      switch (event) {
        case "preflop": {
          //TODO:
          const players = data["players"];
          console.log("players", players);
          const active_players = data["active_players"];
          const button_position = data["button_position"];
          const pot = data["pot"];
          const current = data["current"];

          const current_cards = current["cards"];
          const currentPocketHand = convertStringToPocketHand(current_cards);
          setCurrentPlayerCards(currentPocketHand);

          break;
        }
        case "flop_cards": {
          //TODO:
          break;
        }
        case "turn_card": {
          //TODO:
          break;
        }
        case "river_card": {
          //TODO:
          break;
        }
        case "winner": {
          //TODO:
          break;
        }
        case "request_action": {
          //TODO:
          break;
        }
        default: {
          alert("wrong event type came from backend => " + event);
        }
        //TODO: other events
      }
    });

    //TODO: connect to websocket
    // socket.emit('message',)

    // const fetchEvents = () => {
    // console.log(username, tableId);
    //let handleState = this.state.handleState;
    // axios
    //   .get(`http://localhost:8000/api/messages/${tableId}/${username}/`)
    //   .then((response) => {
    //     //  this.processEvents(response.data.slice(handleState, handleState + 5));
    //     //this.setState({ handleState: handleState + 5 });
    //   })
    //   .catch(console.log);
    // };

    // fetchEvents();
    // let interval = setInterval(() => {
    //   getData();
    // }, 2000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  // socket.on('message',()=>{
  //   if message='preflop'{
  //     setCurrentPlayerCards(cards from backend)
  //   }
  //   if message ='request action'{
  //     setActions(allowed actions from backend)
  //   }
  //   if message='winner'{
  //     setwinner
  //   }
  //   if mesage='loser'{
  //     setloser
  //   }
  // })

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

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
  };

  const onJoinTableClick = async () => {
    const response = await API.get(`/tables/${tableId}/join/${username}/`);
    console.log("join table ", response.data);
    setIsPlayer(true);
    refreshPlayers();
    //todo: subscribe #2 to socketio
  };

  const onLeaveTableClick = async () => {
    const response = await API.get(`/tables/${tableId}/leave/${username}/`);
    console.log("join table ", response.data);
    setIsPlayer(false);
    refreshPlayers();
    //todo: subscribe #2 to socketio
  };

  return (
    <div className={classes.container}>
      <h3>socket message: {socketResponse}</h3>
      <h3>tableId: {tableId}</h3>
      <h3>username: {username}</h3>
      <Button
        onClick={() => {
          API.get("/restart");
        }}
      >
        Restart hand
      </Button>
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
            {players
              .sort((a, b) => {
                return a.position - b.position;
              })
              .map((player: IPlayer, index: number) => (
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
