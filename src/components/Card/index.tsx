import React, { useEffect } from "react";
import "./card-style.css";

interface ICardProps {
  suitProp?: string;
  value?: string;
  disabled?: boolean;
}

const Card = ({ suitProp, value, disabled }: ICardProps) => {
  const [suit, setSuit] = React.useState("");

  useEffect(() => {
    if (suitProp === "d") setSuit("diamonds");
    if (suitProp === "c") setSuit("clubs");
    if (suitProp === "h") setSuit("hearts");
    if (suitProp === "s") setSuit("spades");
  }, [suitProp]);

  return (
    <>
      {disabled ? (
        <div className="cardDis"></div>
      ) : (
        <div className="card">
          <h2 className={`${suit}-value`}>{value}</h2>
          <div className={suit}></div>
          <h2 className={`${suit}-value`}>{value}</h2>
        </div>
      )}
    </>
  );
};

export default Card;
