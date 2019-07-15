import React, { Component } from "react";
import "./Authenticated.css";
import Icon from "../../Image/gastly.svg";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

export default class Authenticated extends Component {
  constructor(props) {
    super(props);
    const token = JSON.parse(localStorage.getItem("Token"));
    var isLoggedIn = false;
    if (token !== null) {
      isLoggedIn = true;
    }
    this.state = { isLoggedIn, currentUser: token };
    this.logoutBtnClicked = this.logoutBtnClicked.bind(this);
  }

  logoutBtnClicked() {
    localStorage.removeItem("Token");
    this.props.getValue(false);
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
        <div>
          <Button onClick={this.logoutBtnClicked} className="logout-btn">
            Logout
          </Button>
        </div>
      </div>
    );
  }
}
