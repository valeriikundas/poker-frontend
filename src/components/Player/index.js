import React from "react";
import styles from "./player-style.css";
import Card from "../Card";

const Player = ({player, currentPlayerPosition, currentPlayerCards, position, value}) => {
    return (
        <div className={styles.player}>
            <div className={styles.playerCard}>
                {  currentPlayerPosition === position &&<h3>{value}</h3>}
                {
                    currentPlayerPosition === position &&
                    currentPlayerCards.map((card, index) => (
                        <Card value={card[0]}
                              suit={card[1]}
                              key={index}
                        />
                    ))
                }
                {
                    currentPlayerPosition !== position &&
                    currentPlayerCards.map((card, index) => (
                        <Card disabled={true}
                              key={index}
                        />
                    ))
                }
            </div>
            <div className={styles.playerPlace}>
                <div className={styles.playerName}>{player.username}</div>
                <div className={styles.playerStack}>{player.stack_size}</div>
            </div>
        </div>
    )
};

export default Player;
