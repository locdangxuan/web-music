import React, { Component } from "react";
import "./Authenticated.css";
import Icon from "../../Image/user.svg";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

export default class Authenticated extends Component {
  constructor(props) {
    super(props);
    const token = JSON.parse(localStorage.getItem("Token"));
    let isLoggedIn = false;
    if (token !== null) {
      isLoggedIn = true;
    }
    this.state = {
      isLoggedIn, currentUser: token,
      username: token.username,
      modal: false,
      nestedModal: false,
      closeAll: false,
      warning: ''
    };
  }

  render() {
    return (
      <div className="authenticated">
        <div className="avatar">
          <img src={Icon} width={40} alt="Icon" />
        </div>
        <div className="user-info">
          <UserContext.Consumer>
            {({currentUser,resetMessage}) => (
          <Link
            className="user"
            to={`/info/${currentUser.firstName}_${currentUser.lastName}`}
            onClick={resetMessage}
          >
            <p>{currentUser.firstName + " " + currentUser.lastName}</p>
          </Link>)}
          </UserContext.Consumer>
        </div>
        <div className="logout-btn">
          <Link to={'/'}>
            <UserContext.Consumer>
              {({logoutFunction}) => (
            <Button onClick={()=> logoutFunction()} className="button">
              Logout
            </Button>)}
            </UserContext.Consumer>
          </Link>
        </div>
      </div>
    );
  }
}
