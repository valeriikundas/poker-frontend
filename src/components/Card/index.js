import React from "react";
import styles from "./card-style.css";

const Card = ({suit, value, disabled}) => {
    if (suit === 'd') suit = 'diamonds';
    if (suit === 'c') suit = 'clubs';
    if (suit === 'h') suit = 'hearts';
    if (suit === 's') suit = 'spades';
    return (
        <>
            {disabled
                ? <div className={styles.cardDis}></div>
                : <div className={styles.card}>
                    <h2 className={styles[`${suit}-value`]}>{value}</h2>
                    <div className={styles[suit]}></div>
                    <h2 className={styles[`${suit}-value`]}>{value}</h2>
                </div>
            }
        </>
    )
};

export default Card;
