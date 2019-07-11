import React , { Component } from 'react';
import './Authenticated.css';
import Icon from '../../Image/gastly.svg';
import { Button } from 'reactstrap';


export default class Authenticated extends Component
{
    constructor(props)
    {
        super(props);
        const token = JSON.parse(localStorage.getItem('Token'));
        var isLoggedIn = false;
        if(token !== null) { isLoggedIn = true; };
        this.state = { isLoggedIn,currentUser: token };
        this.logoutBtnClicked = this.logoutBtnClicked.bind(this);


    }
    logoutBtnClicked(){
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
                    <p className = "userInfo">{currentUser.firstName + ' ' + currentUser.lastName}</p>
                    <Button className = "logoutBtn" outline color="secondary" onClick={this.logoutBtnClicked}>Logout</Button>
                </div>               
            </div> 
        )
        
    }
}