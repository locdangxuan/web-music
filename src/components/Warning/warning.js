import React, {Component } from 'react';
import "./warning.css";
import { Button } from 'reactstrap';
export default class Warning extends Component{
    constructor(props)
    {
        super(props);
        this.state = { Show: true };
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    onClickHandler()
    {
        this.setState({Show: false})
    }
    render()
    {
        return(
            <div className="warning-for-users">
                {this.state.Show && 
                <div>
                <span>A User can only add 1 song and vote 5 times a day</span>
                <Button outline color="primary" onClick={this.onClickHandler}>X</Button>
                </div>}
            </div>
        )
    }
}