import React, { Component } from "react";
import axios from "axios";
import { server } from "../server";
import { Alert } from "../ConfirmAlert/confirmalert";

export const UserContext = React.createContext();

export class UserProvider extends Component {
  constructor() {
    super();
    let storage = localStorage.getItem("Token");
    let user = {};
    let isLoggedIn = false;
    if (storage !== null) {
      user = JSON.parse(storage);
      isLoggedIn = true;
    }
    this.state = {
      isLoggedIn: isLoggedIn,
      currentUser: user,
      message: "",
      messageUpdate: ""
    };
    this.loginFunction = this.loginFunction.bind(this);
    this.logoutFunction = this.logoutFunction.bind(this);
    this.changeInfo = this.changeInfo.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.resetMessage = this.resetMessage.bind(this);
  }

  loginFunction(username, password) {
    let user = { username: username, password: password };
    axios
      .post(server + "/api/users/authenticate", user)
      .then(response => {
        let currentUser = {
          token: response.data.message.token,
          firstName: response.data.message.firstName,
          lastName: response.data.message.lastName,
          username: response.data.message.username,
          email: response.data.message.email
        };
        localStorage.setItem("Token", JSON.stringify(currentUser));
        this.setState({
          currentUser: currentUser,
          isLoggedIn: true,
          message: ""
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          message: "Invalid username or password"
        });
      });
  }

  logoutFunction() {
    axios({
      method: "POST",
      url: server + "/api/users/logout",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("Token")).token
      },
      data: {
        username: this.state.currentUser.username
      }
    })
      .then(response => {
        if (response.status === 200) {
          Alert("Message", "Logged out Succesfully");
          localStorage.removeItem("Token");
          this.setState({
            currentUser: {},
            isLoggedIn: false,
            message: ""
          });
        }
      })
      .catch(error => {
        console.log(JSON.parse(localStorage.getItem("Token")).token);
        console.log(error);
      });
  }

  changeInfo(username, email, firstName, lastName) {
    if (firstName.length === 0)
      this.setState({ message: "Firstname is required" });
    else {
      let updatedUser = {
        username:
          username.length === 0 ? this.state.currentUser.username : username,
        email: email.length === 0 ? this.state.currentUser.email : email,
        firstName:
          firstName.length === 0 ? this.state.currentUser.firstName : firstName,
        lastName:
          lastName.length === 0 ? this.state.currentUser.lastName : lastName
      };
      axios({
        method: "PUT",
        url: server + "/api/users/update",
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("Token")).token
        },
        data: updatedUser
      })
        .then(async response => {
          if (response.status === 200) {
            await this.setState({
              message: "User successfully updated",
              currentUser: {
                username: updatedUser.username,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                token: this.state.currentUser.token
              }
            });
            localStorage.setItem(
              "Token",
              JSON.stringify(this.state.currentUser)
            );
          }
        })
        .catch(error => {
          Alert("Error", "Information was not updated");
          console.log(error);
        });
    }
  }

  changePassword(oldPassword, newPassword, newPasswordValid) {
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      newPassword.length === 0
    )
      this.setState({
        messageUpdate: "Please input all the three text fields above!"
      });
    else {
      if (newPassword.length < 8)
        this.setState({
          messageUpdate: "Password must contains 8 digits or more!"
        });
      else {
        if (newPassword !== newPasswordValid)
          this.setState({
            messageUpdate: "Password confirmation does not match!"
          });
        else {
          axios({
            method: "PUT",
            url: server + "/api/users/changepassword",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("Token")).token
            },
            data: { oldPassword: oldPassword, newPassword: newPassword }
          })
            .then(response => {
              if (response.status === 200)
                this.setState({
                  messageUpdate: ""
                });
              Alert("Message", "Password successfully changed");
            })
            .catch(error => {
              this.setState({
                messageUpdate: ""
              });
              Alert("Error", "Password was not changed");
              console.log(error);
            });
        }
      }
    }
  }

  resetMessage() {
    this.setState({
      message: "",
      messageUpdate: ""
    });
  }

  render() {
    return (
      <div>
        <UserContext.Provider
          value={{
            isLoggedIn: this.state.isLoggedIn,
            currentUser: this.state.currentUser,
            message: this.state.message,
            messageUpdate: this.state.messageUpdate,
            loginFunction: this.loginFunction,
            logoutFunction: this.logoutFunction,
            resetMessage: this.resetMessage,
            changeInfo: this.changeInfo,
            changePassword: this.changePassword
          }}
        >
          {this.props.children}
        </UserContext.Provider>
      </div>
    );
  }
}
