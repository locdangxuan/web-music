import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import './CountdownClock.css';

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return <Completionist />;
    } else {
        // Render a countdown
        return (
            <span>
                {hours}:{minutes}:{seconds}
            </span>
        );
    }
};

const Completionist = () => <span>Playlist is on !!! Drop the beat</span>;

export default class CountdownClock extends Component {
    constructor() {
        super();
        this.state = { countdown: 0 }
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
        console.log(time);
        this.setState({
            countdown: time
        })
    }
    render() {
        return (
            <div className="countdown-clock">
                <div>
                    <span>Playlist start in</span>
                </div>
                <Countdown date={this.state.countdown} renderer={renderer} />
            </div>
        )
    }
}