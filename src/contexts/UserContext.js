import React, { Component } from "react";
import axios from "axios";
import { server } from "../server";

export const UserContext = React.createContext();

export class UserProvider extends Component {
  constructor() {
    super();
    let storage = localStorage.getItem("Token");
      if (storage !== null) {
        
      }

      this.state = {
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        passwordValid: "",
        warning: "",
        storage: JSON.parse(storage),
      };
    
  }

  updateUsername = newUsername => {
    console.log("change");
    this.setState({ username: newUsername });
  };

  updateFirstName = newFirstName => {
    this.setState({ firstName: newFirstName });
  };

  updateLastName = newLastName => {
    this.setState({ lastName: newLastName });
  };

  updateEmail = newEmail => {
    this.setState({ email: newEmail });
  };

  updatePassword = newPassword => {
    this.setState({ password: newPassword });
  };

  updatePasswordValid = newPasswordValid => {
    this.setState({ passwordValid: newPasswordValid });
  };

  updateClick = () => {
    const {
      username,
      firstName,
      lastName,
      password,
      passwordValid,
      email,
      storage
    } = this.state;
    if (storage !== null) {
      if (
        username === "" ||
        firstName === "" ||
        password === "" ||
        passwordValid === "" ||
        email === "" ||
        lastName === ""
      )
        this.setState({ warning: "Please fill all the information below" });
      else {
        if (username.length < 8) {
          this.setState({
            warning:
              "username does not match required length ( 8 letters or more )"
          });
        } else {
          if (password !== passwordValid) {
            this.setState({ warning: "passwords does not match each others" });
          } else {
            let updateUser = {
              username: username,
              password: password,
              email: email,
              firstName: firstName,
              lastName: lastName
            };
            axios({
              method: "PUT",
              url: server + "/api/users/update",
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("Token")).token
              },
              data: updateUser
            })
              .then(response => {
                if (response.status === 200) {
                  let userData = storage;
                  userData.username = username;
                  userData.firstName = firstName;
                  userData.lastName = lastName;
                  userData.email = email;
                  let storageUpdate = JSON.stringify(userData);
                  this.setState({
                    warning: response.data,
                    storage: userData
                  });
                  localStorage.setItem("Token", storageUpdate);
                }
              })
              .catch(error => {
                this.setState({ warning: "Failed to update" });
                console.log(error);
              });
          }
        }
      }
    }
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          passwordValid: this.state.passwordValid,
          warning: this.state.warning,
          updateClick: this.updateClick,
          updateUsername: this.updateUsername,
          updateFirstName: this.updateFirstName,
          updateLastName: this.updateLastName,
          updateEmail: this.updateEmail,
          updatePassword: this.updatePassword,
          updatePasswordValid: this.updatePasswordValid,
          storage: this.state.storage
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
