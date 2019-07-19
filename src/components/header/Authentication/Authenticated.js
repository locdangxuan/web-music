import React, { Component } from "react";
import "./Authenticated.css";
import Icon from "../../Image/gastly.svg";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { server }   from '../../../server.js';
import { Alert }   from '../../../confirmalert';


export default class Authenticated extends Component {
  constructor(props) {
    super(props);
    const token = JSON.parse(localStorage.getItem("Token"));
    let isLoggedIn = false;
    if (token !== null) {
      isLoggedIn = true;
    }
    this.state = { isLoggedIn, currentUser: token,  username: token.username };
    this.logoutBtnClicked = this.logoutBtnClicked.bind(this);
  }

  async logoutBtnClicked() {
    this.props.getValue(false);
    await axios({
      method: 'POST',
      url: server + '/api/users/logout',
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('Token')).token
      },
      data: { username: this.state.currentUser.username}
    })
    .then(response => {
      console.log(response.status);
      if (response.status === 200) {
        Alert('Message','Logged out Succesfully!!!');
      }
    })
    .catch(error => {
      Alert('Warning',
        error
      );
    });
    localStorage.removeItem("Token");
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="authenticated">
          <div className="avatar">
            <img src={Icon} width={40} alt="Icon" />
          </div>
          <div className="user-info">
            <Link className = "user" to={`/info/${currentUser.firstName}_${currentUser.lastName}`}><p>
              {currentUser.firstName + " " + currentUser.lastName}
            </p></Link>
          </div>
          <div className="logout-btn">
            <Link to={'/'}><Button onClick={this.logoutBtnClicked} className="button">Logout</Button></Link>
          </div>
      </div>
    );
  }
}
