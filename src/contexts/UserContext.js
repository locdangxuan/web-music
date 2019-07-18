import React, { Component } from "react";
import axios from "axios";
import { server } from "../server";

export const UserContext = React.createContext();

export class UserProvider extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: "",
        password: "",
        passwordValid: "",
        firstName: "",
        lastName: "",
        email: ""
      }
    };
  }

  clickToUpdate = updateUser => {
    let storage = localStorage.getItem("Token");
    console.log(storage);
    if (storage !== null) {
      let userData = JSON.parse(storage);
      if (
        updateUser.username === "" ||
        updateUser.firstName === "" ||
        updateUser.password === "" ||
        updateUser.passwordValid === "" ||
        updateUser.email === "" ||
        updateUser.lastName === ""
      )
        alert("Please fill all the information below");
      else {
        if (updateUser.username.length < 8) {
          alert(
            "username does not match required length ( 8 letters or more )"
          );
        } else {
          if (updateUser.password !== updateUser.passwordValid) {
            alert("passwords does not match each others");
          } else {
            axios({
              method: "PUT",
              headers: {
                Authorization: "Bearer " + userData.token
              },
              url: server + `/api/users/${userData._id}`,
              data: {
                updateUser
              }
            })
              .then(response => {
                console.log(response.status);
                if (response.status === 200) {
                  alert(response.data);
                  storage = JSON.stringify(userData);
                  console.log(storage);
                  localStorage.setItem("Token", storage);
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
      <div>
        <UserContext.Provider
          value={{
            user: this.state.user,
            clickToUpdate: this.clickToUpdate
          }}
        >
          {this.props.children}
        </UserContext.Provider>
      </div>
    );
  }
}
