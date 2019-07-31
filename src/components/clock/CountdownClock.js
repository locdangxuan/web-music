import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import './CountdownClock.css';
import moment from 'moment';
import schedule from 'node-schedule';

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return <span className="wrapper">Playlist is on! Drop the beat</span>;
    } else {
        return (
            <div className="wrapper">
                <span>Playlist start in</span>
                <br />
                <span >
                    {hours}:{minutes}:{seconds}
                </span>
            </div>
        );
    }
};

export default class CountdownClock extends Component {
    constructor() {
        super();
        this.state = { countdown: '', start: false }
        this.startCounting = this.startCounting.bind(this);
    }
    componentWillMount() {
        let d = new Date();
        let day = d.getDate();
        let month;
        let year = d.getFullYear();
        switch (d.getMonth()) {
            case 0:
                month = 'Jan';
                break;
            case 1:
                month = 'Feb';
                break;
            case 2:
                month = 'Mar';
                break;
            case 3:
                month = 'Apr';
                break;
            case 4:
                month = 'May';
                break;
            case 5:
                month = 'Jun';
                break;
            case 6:
                month = 'Jul';
                break;
            case 7:
                month = 'Aug';
                break;
            case 8:
                month = 'Sep';
                break;
            case 9:
                month = 'Oct';
                break;
            case 10:
                month = 'Nov';
                break;
            case 11:
                month = 'Dec';
                break;
            default:
                break;
        }
        let time = month + ` ${day} ${year} 17:30:00`;
        this.setState({
            countdown: time
        })
    }
    componentDidMount() {
        let countdownScheduled = new schedule.RecurrenceRule();
        if (moment().isBefore(moment('17:20:0', 'hh:mm:ss'))) {
            countdownScheduled.hour = 17;
            countdownScheduled.minute = 20;
            schedule.scheduleJob(countdownScheduled, this.startCounting);
        }
        else 
        this.startCounting();
    }
    startCounting() {
        this.setState({
            start: true
        })
    }
    render() {
        return (
            <div className="countdown-clock">
                {this.state.start &&
                    <Countdown date={this.state.countdown} renderer={renderer} />
                }
            </div>
        )
    }
}