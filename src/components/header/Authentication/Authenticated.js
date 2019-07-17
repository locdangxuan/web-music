import React, { Component } from "react";
import "./Authenticated.css";
import Icon from "../../Image/gastly.svg";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
// import { lovely_server }   from '../../../server.js';
import { server }   from '../../../server.js';


export default class Authenticated extends Component {
  constructor(props) {
    super(props);
    const token = JSON.parse(localStorage.getItem("Token"));
    var isLoggedIn = false;
    if (token !== null) {
      isLoggedIn = true;
    }
    this.state = { isLoggedIn, currentUser: token,  username: token.username };
    this.logoutBtnClicked = this.logoutBtnClicked.bind(this);
  }

  logoutBtnClicked() {
    this.props.getValue(false);
    axios({
      method: 'POST',
      url: server + "/api/users/logout",
      data: { username: this.state.username}
    })
    .then(response => {
      console.log(response.status);
      if (response.status === 200) {
        alert("Logged out Succesfully!!!");
      }
    })
    .catch(error => {
      alert(
        "Failed to log out"
      );
      console.log(error);
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
