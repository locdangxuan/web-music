import React, { Component } from "react";
import axios from "axios";
import { server } from "../server";

export const UserContext = React.createContext();

export class UserProvider extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      passwordValid: "",
      warning: ""
    };
  }

  updateUsername = newUsername => {
    this.setState({ username: newUsername });
    console.log(this.state.username);
  };

  updateFirstName = newFirstName => {
    this.setState({firstName: newFirstName});
    console.log(this.state.firstName);
  }

  updateLastName = newLastName => {
    this.setState({lastName: newLastName});
    console.log(this.state.lastName);
  }

  updateEmail = newEmail => {
    this.setState({email: newEmail})
    console.log(this.state.email);
  }

  updatePassword = newPassword => {
    this.setState({password: newPassword});
  }

  updatePasswordValid = newPasswordValid => {
    this.setState({passwordValid: newPasswordValid})
  }

  updateClick = () => {
    const storage = localStorage.getItem("Token");
    if (storage !== null) {
      let username = this.refs.username.value;
      let firstName = this.refs.firstName.value;
      let lastName = this.refs.lastName.value;
      let password = this.refs.password.value;
      let passwordValid = this.refs.passwordValid.value;
      let email = this.refs.email.value;
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
              headers: {
                Authorization: "Bearer " + JSON.parse(storage).token
              },
              url: server + `/api/users/${JSON.parse(storage)._id}`,
              data: {
                updateUser
              }
            })
              .then(response => {
                if (response.status === 200) {
                  alert("Successfully updated !!!");
                }
              })
              .catch(error => {
                alert("Failed to update");
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
            email: this.state.email,
            updateClick: this.updateClick,
            updateUsername: this.updateUsername,
            updateFirstName: this.updateFirstName,
            updateLastName: this.updateLastName,
            updateEmail: this.updateEmail,
            updatePassword: this.updatePassword,
            updatePasswordValid: this.updatePasswordValid
          }}
        >
          {this.props.children}
        </UserContext.Provider>
    );
  }
}
