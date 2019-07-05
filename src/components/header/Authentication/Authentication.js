import React , { Component } from 'react';
import './Authentication.css';
import Authenticated from './Authenticated';
import UnAuthenticated from './UnAuthenticated';

export default class Authentication extends Component{
    constructor(props)
    {
        super(props);
        this.state = {loggedIn: false};
        const token = JSON.parse(localStorage.getItem('Token')); 
        this.changeState = this.changeState.bind(this);
    }
    changeState(value)
    {
        console.log(value);
        this.setState({loggedIn: value});
    }
    render(){
        const {loggedIn} = this.state;
        return(
        <div>
        {loggedIn && <Authenticated getValue = {this.changeState}/>}
        {loggedIn === false && <UnAuthenticated getValue = {this.changeState}/>}
        </div>
        )
    }
}