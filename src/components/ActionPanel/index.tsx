import { Button } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import axios from "axios";
import React from "react";
import { ActionType, IRequestAction } from "../../types/index";

// import useStyles from "./action-panel-style.css";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#2d7576" },
  },
});

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },

  buttons: {
    width: "400px",
    display: "flex",
    alignItems: "center",
    marginRight: "35px",
  },

  actionButton: {
    border: "1px solid #40ffe5",
    borderRadius: "2px",
    background: "#2d7576",
    margin: "5px 15px",
    textTransform: "uppercase",
    padding: "20px 30px",
  },
});

interface TimeoutProps {
  value?: number; //todo: remove
  seconds: number;
  tooLate: boolean; //todo: p4 in the future
}

interface ActionPanelProps {
  actions: IRequestAction[];
  tableId: number;
  username: string;
  setCall: any; //todo: delete this variable
}

const ActionPanel = ({
  tableId,
  username,
  actions,
  ...props
}: ActionPanelProps) => {
  const classes = useStyles();

  const [timeoutProps, setTimeoutProps] = React.useState<TimeoutProps>({
    // value: 10,
    //todo: p4 to be implemented later
    seconds: 10,
    tooLate: false,
  });

  const [raiseSize, setRaiseSize] = React.useState(0);

  // const [aaa,setAaa]=React.useState(
  // {  value: 0,
  //   seconds: 30,
  //   tooLate: false}
  // )
  // this.handleChange = this.handleChange.bind(this);
  // this.handleAction = this.handleAction.bind(this);
  // this.tick = this.tick.bind(this);
  // };

  //   React.useEffect(
  //         ()=>   {
  //     setAaa({...aaa})
  //         //timer:setInterval(this.tick, 1000)});
  //   },[]);

  //   tick() {
  //     if (this.state.seconds > 0) {
  //       this.setState({ seconds: this.state.seconds - 1 });
  //     } else {
  //       clearInterval(this.timer);
  //       this.setState({ tooLate: true });
  //       //window.location.reload();
  //     }
  //   }

  const handleSliderChange = (event: any, newValue: any) => {
    // setSomeProps({ ...someProps, value: newValue });
    // const newValue = event.target.value;

    setRaiseSize(newValue);
  };

  //     const objResp = JSON.stringify(response);
  //     console.log(objResp);
  //     axios
  //       .post(
  //         `http://localhost:8000/api/messages/response/${this.props.tableId}/${this.props.username}/`,
  //         { objResp }
  //       )
  //       .then((res) => {
  //         console.log(res);
  //         console.log(res.data);
  //       });
  //   }

  const handleAction = (type: ActionType, size?: number) => {
    console.log(type, size);
    axios.post(`http://localhost:5000/api/act/${tableId}/${username}`, {
      type: type,
      size: size,
    });

    // todo: p4 timeout on moves
    //   const response = this.state.tooLate
    //     ? { status: "timeout" }
    //     : type === "raise"
    //     ? {
    //         status: "ok",
    //         action: {
    //           type,
    //           size: this.state.value,
    //         },
    //       }
    //     : {
    //         status: "ok",
    //         action: { type },
    //       };
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.wrapper}>
        {!timeoutProps.tooLate &&
          actions.map((button: any, index: number) =>
            button.type === "call" ? (
              <Button
                key={index}
                className={classes.actionButton}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleAction("call", button.size);
                }}
              >
                call {button.size}
              </Button>
            ) : button.type === "raise" ? (
              <div className={classes.buttons} key={index}>
                <Button
                  key={index}
                  className={classes.actionButton}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleAction("raise", raiseSize);
                  }}
                >
                  RAISE&nbsp;{raiseSize}
                </Button>
                <Slider
                  key={index + 1}
                  value={raiseSize}
                  onChange={handleSliderChange}
                  defaultValue={button.max}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={button.min}
                  max={button.max}
                />
              </div>
            ) : (
              <Button
                key={index}
                className={classes.actionButton}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleAction(button.type);
                }}
              >
                {button.type}
              </Button>
            )
          )}
        {/* <h1>00:{someProps.seconds}</h1> */}
      </div>
    </MuiThemeProvider>
  );
};

export default ActionPanel;
