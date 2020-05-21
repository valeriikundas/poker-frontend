import React from "react";
import { makeStyles } from "@material-ui/styles";
// import styles from "./card-style.css";

const useStyles = makeStyles({
  card: {
    height: "100px",
    width: " 70px",
    margin: "5px",
    borderRadius: "5px",
    display: "inline-block",
    position: "relative",
    backgroundColor: "white",
  },
  cardDis: {
    height: "100px",
    width: "70px",
    margin: "5px",
    borderRadius: "5px",
    display: "inline-block",
    position: "relative",
    background:
      "url(https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0585/3987/rHaromszoges_Gray_mirror.png)",
    backgroundSize: "100%",
  },
  clubs: {
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "30%",
    left: "27%",
    backgroundImage:
      "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/441095/clovers.svg')",
    backgroundSize: "60px",
    backgroundPosition: "30px 30px",
  },
  diamonds: {
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "30%",
    left: "27%",
    backgroundImage:
      "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/441095/clovers.svg')",
    backgroundSize: "60px",
    backgroundPosition: "30px 0",
  },
  hearts: {
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "30%",
    left: "27%",
    backgroundImage:
      "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/441095/clovers.svg')",
    backgroundSize: "60px",
    backgroundPosition: "0 30px",
  },
  spades: {
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "30%",
    left: "27%",
    backgroundImage:
      "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/441095/clovers.svg')",
    backgroundSize: "60px",
    backgroundPosition: "0 0",
  },
  clubsValue: {
    color: "#515260",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0",
  },
  spadesValue: {
    color: "#515260",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0",
  },
  heartsValue: {
    color: "#EC6E69",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0",
  },
  diamondsValue: {
    color: "#EC6E69",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0",
  },
  someClass: {
    backgroundColor: "green",
    ".clubs-value:first-child, .spades-value:first-child, .hearts-value:first-child, .diamonds-value:first-child": {
      top: "2px",
      left: "5px",
      position: "absolute",
    },
  },
  // .clubs-value:last-child, .spades-value:last-child, .hearts-value:last-child, .diamonds-value:last-child {
  //   position: absolute;
  //   bottom: 2px;
  //   right: 5px;
  //   transform: rotatez(180deg)
  // }
});

interface ICardProps {
  suitProp?: string;
  value?: string;
  disabled?: boolean;
}

const Card = ({ suitProp, value, disabled }: ICardProps) => {
  const classes = useStyles();

  //const [suit, setSuit] = React.useState("");

  // useEffect(() => {
  //   (suitProp)
  //   if (suitProp === "d") setSuit("diamonds");
  //   if (suitProp === "c") setSuit("clubs");
  //   if (suitProp === "h") setSuit("hearts");
  //   if (suitProp === "s") setSuit("spades");
  // }, [suitProp]);

  return (
    <>
      {disabled ? (
        <div className={classes.cardDis}></div>
      ) : (
        <div className={classes.card}>
          <h2>{value}</h2>
          <div></div>
          <h2>{value}</h2>
          {/* <h2 className={classes[`${suit}-value`]}>{value}</h2>
          <div className={classes[suit]}></div>
          <h2 className={classes[`${suit}-value`]}>{value}</h2> */}
        </div>
      )}
    </>
  );
};

export default Card;
