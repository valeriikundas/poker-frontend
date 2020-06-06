import React from "react";
//import styles from "./player-style.css";
import Card from "../Card";
import { makeStyles } from "@material-ui/styles";
import { IPlayer, IPocketHand, ICard } from "../../types";

const useStyles = makeStyles({
  player: {
    // position: "absolute",
  },

  playerPlace: {
    // width: "12em",
    // height: "15%",
    // border: "1px solid #434144",
    // backgroundColor: "#222222ab !important",
    // borderRadius: "20px",
  },

  playerCard: {
    // position: "absolute !important",
    bottom: "10%",
    left: "9%",
    zIndex: -1,
  },

  playerAvatar: {},

  playerName: {
    padding: "3px",
    textAlign: "center",
    color: "#ffffff",
  },

  playerStack: {
    padding: "3px",
    textAlign: "center",
    color: "#00fff2",
  },

  // "@global": {
  //   ".player:nth-child(1)": {
  //     top: "50%",
  //     transform: "translatex(-60%)",
  //   },

  //   ".player:nth-child(4)": {
  //     bottom: "0",
  //     left: "43%",
  //     transform: "translatey(65%)",
  //   },

  //   ".player:nth-child(9)": {
  //     top: "5%",
  //     left: "20%",
  //     transform: "translatex(0%) translatey(-55%)",
  //   },

  //   ".player:nth-child(2)": {
  //     right: "0",
  //     top: "50%",
  //     transform: "translatex(60%)",
  //   },

  //   ".player:nth-child(3)": {
  //     right: "0",
  //     bottom: "0",
  //     transform: "translatex(-10%) translatey(40%)",
  //   },

  //   ".player:nth-child(5)": {
  //     top: "5%",
  //     right: "20%",
  //     transform: "translatey(-55%)",
  //   },

  //   ".player:nth-child(6)": {
  //     bottom: "0",
  //     left: "0",
  //     transform: "translatex(10%) translatey(40%)",
  //   },

  //   ".player:nth-child(7)": {
  //     top: "10%",
  //     transform: "translatex(-40%)",
  //   },

  //   ".player:nth-child(8)": {
  //     top: "10%",
  //     right: "0",
  //     transform: "translatex(40%)",
  //   },
  // },
});

interface PlayerProps {
  player: IPlayer;
  currentPlayerPosition: number;
  currentPlayerCards: IPocketHand | null;
  position: number;
  value: any;
}

const Player = ({
  player,
  currentPlayerPosition,
  currentPlayerCards,
  position,
  value,
}: PlayerProps) => {
  const classes = useStyles();

  return (
    <div
      className={classes.player}
      style={{ border: "solid 2px", margin: "5px", borderColor: "#335855" }}
      //todo: remove above style for table?
    >
      <div className={classes.playerCard}>
        {currentPlayerPosition === position && <h3>{value}</h3>}
        {currentPlayerPosition === position &&
          currentPlayerCards &&
          currentPlayerCards.map((card: ICard, index: number) => (
            <Card key={index} card={card} />
          ))}
        {currentPlayerPosition !== position &&
          currentPlayerCards &&
          currentPlayerCards.map((card: ICard, index: number) => (
            <Card key={index} disabled />
          ))}
      </div>
      <div className={classes.playerPlace}>
        <div className={classes.playerName}>{player.username}</div>
        <div className={classes.playerName}>{player.position || "none"}</div>
        <div className={classes.playerStack}>{player.stack_size}</div>
      </div>
    </div>
  );
};

export default Player;
