import React, { Component } from "react";
import "./action-panel-style.css";
import axios from "axios";
import Slider from "@material-ui/core/Slider";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#2d7576" },
  },
});

interface SomeProps {
  value: number;
  seconds: number;
  tooLate: boolean;
}

interface ActionPanelProps {
  actions: any;
  tableId: number;
  username: string;
  setCall: any;
}

const ActionPanel = (props: ActionPanelProps) => {
  const [someProps, setSomeProps] = React.useState<SomeProps>({
    value: 10,
    seconds: 10,
    tooLate: false,
  });

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
    setSomeProps({ ...someProps, value: newValue });
  };

  //   handleAction(type) {
  //     const response = this.state.tooLate
  //       ? { status: "timeout" }
  //       : type === "raise"
  //       ? {
  //           status: "ok",
  //           action: {
  //             type,
  //             size: this.state.value,
  //           },
  //         }
  //       : {
  //           status: "ok",
  //           action: { type },
  //         };

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

  return (
    <MuiThemeProvider theme={theme}>
      <div className="wrapper">
        {!someProps.tooLate &&
          props.actions.map((button: any, index: any) =>
            button.type === "call" ? (
              <button
                key={index}
                className="button"
                //  onClick={() => this.handleAction(button.type)}
              >
                {button.type}
                {button.size}
              </button>
            ) : button.type === "raise" ? (
              <div className="buttons">
                <button
                  key={index}
                  className="button"
                  //   onClick={() => {
                  //   this.props.setCall(this.state.value);
                  //}}
                >
                  {button.type}
                  {someProps.value}
                </button>
                <Slider
                  key={index + 1}
                  value={someProps.value}
                  onChange={handleSliderChange}
                  defaultValue={button.max}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={button.min}
                  max={button.max}
                />
              </div>
            ) : (
              <button
                key={index}
                className="button"
                // onClick={() => this.handleAction(button.type)}
              >
                {button.type}
              </button>
            )
          )}
        <h1>00:{someProps.seconds}</h1>
      </div>
    </MuiThemeProvider>
  );
};

export default ActionPanel;
