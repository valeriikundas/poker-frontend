import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socketIOClient from "socket.io-client";
import API from "../../api";
import {
  ICard,
  IPlayer,
  IPocketHand,
  IRank,
  IRequestAction,
  ISuit,
} from "../../types";
import ActionPanel from "../ActionPanel";
import Card from "../Card";
import Player from "../Player";
import useStyles from "./style";

const SOCKETIO_ENDPOINT = "http://localhost:5000/";

const Table: React.FC = () => {
  const classes = useStyles();

  const { state } = useLocation();

  const [currentPlayerPosition, setCurrentPlayerPosition] = React.useState(1); // taken from preflop
  const [
    currentPlayerCards,
    setCurrentPlayerCards,
  ] = React.useState<IPocketHand | null>(null);

  const [players, setPlayers] = React.useState<IPlayer[]>([]);

  const [buttonPosition, setButtonPosition] = useState(1);

  const [event, setEvent] = React.useState("");

  const [cardsOnTable, setCardsOnTable] = useState<ICard[]>([
    { rank: "A", suit: "clubs" },
    { rank: "A", suit: "clubs" },
    { rank: "A", suit: "clubs" },
    { rank: "A", suit: "clubs" },
    { rank: "A", suit: "clubs" },
  ]);
  const [call, setCall] = useState();

  const [actionPosition, setActionPosition] = React.useState(4);

  const [tableId, setTableId] = useState<number>(state && state["tableId"]);
  const [username, setUsername] = useState<string>(state && state["username"]);
  const [actions, setActions] = useState<IRequestAction[]>([
    { type: "fold" },
    { type: "check" },
    { type: "call", size: 20 },
    { type: "raise", min: 50, max: 150 },
  ]);

  const [pot, setPot] = useState(0);

  const [isPlayer, setIsPlayer] = useState(false);

  const [socketResponse, setSocketResponse] = useState("");

  const [blinds, setBlinds] = useState({ small: 0, big: 0, ante: 0 });

  const notify = (message: string) => toast(message);

  // const refreshPlayers = async () => {
  //   const response = await API.get("/tables/1/");
  //   setPlayers(response.data["players"]);
  // };

  const convertStringToCard = (card: string): ICard => {
    const charToSuitMapping: { [key: string]: string } = {
      d: "diamonds",
      s: "spades",
      h: "hearts",
      c: "clubs",
    };

    const rank = card[0] as IRank;
    const suit = charToSuitMapping[card[1]] as ISuit;

    return { suit: suit, rank: rank };
  };

  const convertStringsToPocketHand = (cards: string[]): IPocketHand => {
    const charToISuitMapping: { [key: string]: string } = {
      d: "diamonds",
      s: "spades",
      h: "hearts",
      c: "clubs",
    };

    const rank1 = cards[0] as IRank;
    const suit1 = charToISuitMapping[cards[1]] as ISuit;
    const rank2 = cards[2] as IRank;
    const suit2 = charToISuitMapping[cards[3]] as ISuit;

    return [
      { suit: suit1, rank: rank1 },
      { suit: suit2, rank: rank2 },
    ];
  };

  useEffect(() => {
    // notify("refresh");
    // refreshPlayers();

    const socket = socketIOClient(SOCKETIO_ENDPOINT);

    socket.on("disconnect", () => {
      notify("disconnect event");
    });

    //main event handler
    socket.on("json", (data: { [key: string]: any }) => {
      console.log("received json :>> ", data);
      // setSocketResponse(`${data}`);
      // notify(`received ${data["event"]} event`);

      const event = data["event"];
      console.log("event", event);
      switch (event) {
        case "preflop": {
          //TODO:
          const playersData = data["players"];
          const players: IPlayer[] = playersData.map(
            (player: { [key: string]: any }) => {
              return {
                position: player.position,
                username: player.username,
                stack: player.stack,
              };
            }
          );
          setPlayers(players);

          const activePlayers = data["active_players"];

          const buttonPosition: number = data["button_position"];

          const blinds = data["blinds"];
          setBlinds({
            small: blinds.small,
            big: blinds.big,
            ante: blinds.ante,
          });

          const pot: number = data["pot"];
          setPot(pot);

          const currentPlayerData = data["current"];

          const currentPlayerCards: string[] = currentPlayerData["cards"];
          const currentPocketHand = currentPlayerCards.map((card) =>
            convertStringToCard(card)
          ) as IPocketHand;

          setCurrentPlayerCards(currentPocketHand);

          break;
        }
        case "flop_cards": {
          //TODO:
          const receivedFlopCards: string[] = data["flop_cards"];
          const flopCards: ICard[] = receivedFlopCards.map((card: string) =>
            convertStringToCard(card)
          );
          setCardsOnTable(flopCards);
          break;
        }
        case "turn_card": {
          //TODO:

          // var currentTime = new Date().getTime();

          //while (currentTime + 2000 >= new Date().getTime()) {}

          // notify(cardsOnTable.toString());
          // const receivedTurnCard: string = data["turn_card"];
          // const turnCard: ICard = convertStringToCard(receivedTurnCard);
          // debugger;
          //const newCardsOnTable = [...cardsOnTable, turnCard];
          // const newCardsOnTable = cardsOnTable.map((a) => a);
          // const newcardsontable = Object.assign([], cardsOnTable);
          // newcardsontable.push(turnCard);
          // newCardsOnTable.push(turnCard);
          // console.log("*********************** cardsOnTable", cardsOnTable);
          // setCardsOnTable(newCardsOnTable);
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

    API.get("/restart");
  }, []);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
  };

  const onJoinTableClick = async () => {
    const response = await API.get(`/tables/${tableId}/join/${username}/`);
    console.log("join table ", response.data);
    setIsPlayer(true);
    // refreshPlayers();
    //todo: subscribe #2 to socketio
  };

  const onLeaveTableClick = async () => {
    const response = await API.get(`/tables/${tableId}/leave/${username}/`);
    console.log("join table ", response.data);
    setIsPlayer(false);
    // refreshPlayers();
    //todo: subscribe #2 to socketio
  };

  return (
    <div className={classes.container}>
      <ToastContainer />
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
          <div>pot: {pot}</div>
          <div>
            blinds: {blinds.small} {blinds.big} {blinds.ante}
          </div>

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
              .map((player: IPlayer) => (
                <Player
                  player={player}
                  currentPlayerPosition={currentPlayerPosition}
                  currentPlayerCards={currentPlayerCards}
                  position={player.position}
                  key={player.position}
                  value={call}
                  button={player.position === buttonPosition}
                  active={player.position === actionPosition}
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
