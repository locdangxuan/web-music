import React, { Component } from "react";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";
import { UserContext } from "../../../contexts/UserContext";

export default class Authentication extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ isLoggedIn }) => (
          <div>
            {isLoggedIn && <Authenticated />}
            {!isLoggedIn && <UnAuthenticated />}
          </div>)}
      </UserContext.Consumer>
    )
  }
}
