import React , { Component } from 'react';
import './Authentication.css';
import Icon from '/home/locdangxuan/Dev/web-music/src/components/Image/gastly.svg';
import { Button } from 'reactstrap';


export default class Authenticated extends Component
{
    constructor(props)
    {
        super(props);
        const token = JSON.parse(localStorage.getItem('Token'));
        var isLoggedIn = false;
        //console.log(token);
        if(token !== null) { isLoggedIn = true; };
        this.state = { isLoggedIn,currentUser: token };
        this.logoutBtnClicked = this.logoutBtnClicked.bind(this);

    }
    logoutBtnClicked()
    {
        localStorage.removeItem('Token');
        this.props.getValue(false);
    }
    render()
    {
        const {currentUser} = this.state;
        return(
            <div className="Authenticated">
                <div className = "user">
                <img src = {Icon} width = { 40 } alt="Icon"></img>
                <p className = "userInfo">{currentUser.fullname}</p>
                <Button className = "logoutBtn" onClick={this.logoutBtnClicked}>Logout</Button>
                </div>              
            </div> 
        )
        
    }
}