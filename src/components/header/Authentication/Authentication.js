import React, { Component } from "react";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";
import { UserContext } from "../../../contexts/UserContext";

export default class Authentication extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { loggedIn: true };
  // }

  // componentWillMount() {
  //   const token = JSON.parse(localStorage.getItem("Token"));
  //   if (token === null) this.setState({ loggedIn: false });
  // }

  // changeState = value => {
  //   this.setState({ loggedIn: value });
  // };

  render() {
    // const { loggedIn } = this.state;
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
