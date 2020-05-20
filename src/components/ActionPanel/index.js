import React, {Component} from "react";
import styles from "./action-panel-style.css";
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {500: '#2d7576'},
    },
});

class ActionPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            seconds: 30,
            tooLate: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    tick() {
        if (this.state.seconds > 0) {
            this.setState({seconds: this.state.seconds - 1})
        } else {
            clearInterval(this.timer);
            this.setState({tooLate: true});
            //window.location.reload();
        }
    }

    handleChange(event, newValue) {
        this.setState({value: newValue})
    };

    handleAction(type) {
        const response = this.state.tooLate ?
            {status: "timeout"}
            :
            (type === 'raise' ?
                {
                    status: "ok",
                    action: {
                        type,
                        size: this.state.value
                    }
                }
                :
                {
                    status: "ok",
                    action: {type}
                });

        const objResp = JSON.stringify(response);
        console.log(objResp);
        axios.post(`http://localhost:8000/api/messages/response/${this.props.tableId}/${this.props.username}/`, {objResp})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className={styles.wrapper}>
                    {
                        !this.state.tooLate &&
                        this.props.actions.map((button, index) => (
                                button.type === 'call' ?
                                    <button key={index} className={styles.button}
                                            onClick={() => this.handleAction(button.type)}>
                                        {button.type}
                                        {button.size}
                                    </button>
                                    : (button.type === 'raise' ?
                                    <div className={styles.buttons}>
                                        <button key={index} className={styles.button}
                                                onClick={ () => { this.props.setCall(this.state.value)}}>
                                            {button.type}
                                            {this.state.value}
                                        </button>
                                        <Slider key={index + 1}
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                                defaultValue={button.max}
                                                aria-labelledby="continuous-slider"
                                                valueLabelDisplay="auto"
                                                step={10}
                                                marks
                                                min={button.min}
                                                max={button.max}
                                        />
                                    </div>
                                    : <button key={index} className={styles.button}
                                              onClick={() => this.handleAction(button.type)}>
                                        {button.type}
                                    </button>)
                            )
                        )
                    }
                    <h1>00:{this.state.seconds}</h1>
                </div>
            </MuiThemeProvider>

        )
    }
}

export default ActionPanel;

