import React, { Component } from "react";
import { Form, FormGroup, Label, Row, Col } from "reactstrap";
import "./UserModification.css";
import axios from "axios";
import { Button } from "reactstrap";


export default class UserModification extends Component {
  constructor(props) {
    super(props);
    const token = JSON.parse(localStorage.getItem("Token"));
    this.state = {
      email: token.email,
      firstName: token.firstName,
      lastName: token.lastName,
      username: token.username,
      password: "",
      passwordValid: ""
    };
  }

  updateInfo = () => {
    let username = this.refs.userNameRegister.value;
    let firstName = this.refs.firstname.value;
    let lastName = this.refs.lastname.value;
    let password = this.refs.password.value;
    let passwordValid = this.refs.passwordValid.value;
    let email = this.refs.emailRegister.value;
    if (
      username === "" ||
      firstName === "" ||
      password === "" ||
      passwordValid === "" ||
      email === "" ||
      lastName === ""
    )
      alert("Please fill all the information below");
    else {
      if (username.length < 8) {
        alert("username does not match required length ( 8 letters or more )");
      } else {
        if (password !== passwordValid) {
          alert("passwords does not match each others");
        } else {
        //   let updateUser = {
        //     username: username,
        //     password: password,
        //     email: email,
        //     firstName: firstName,
        //     lastName: lastName
        //   };
          axios({
            method: "PUT",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("Token")).token
            },
            url: "https://gorgeous-grand-teton-66654.herokuapp.com/api/users/:id",
            data: {
            }
          })
            .then(response => {
              console.log(response.status);
              if (response.status === 400)
                alert(
                  "Failed to update"
                );
              else if (response.status === 200) {
                alert("Successfully updated !!!");
                this.getPlaylist();
              }
            })
            .catch(error => {
              alert("Failed to update");
              console.log(error);
            });
        }
      }
    }
  };

  render() {
    const { email, username, password, firstName, lastName } = this.state;
    return (
      <div className="user-update">
        <Form className="user-modification">
          <FormGroup>
            <Label for="Email">Email</Label>
            <input
              className="effect-6"
              type="text"
              id="registerPart"
              placeholder={email}
              ref="emailRegister"
            />
          </FormGroup>
          <FormGroup>
            <Label for="userName">Username</Label>
            <input
              className="effect-6"
              type="text"
              id="registerPart"
              placeholder={username}
              ref="userNameRegister"
            />
          </FormGroup>
          <FormGroup>
            <Label for="fullName">Fullname</Label>
            <Row>
              <Col xs="6">
                <input
                  className="effect-6"
                  type="text"
                  id="registerPart"
                  placeholder={firstName}
                  ref="firstname"
                />
              </Col>
              <Col xs="6">
                <input
                  className="effect-6"
                  type="text"
                  id="registerPart"
                  placeholder={lastName}
                  ref="lastname"
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for="passWord">Password</Label>
            <input
              className="effect-6"
              type="password"
              id="registerPart"
              placeholder={password}
              ref="password"
              onKeyUp={this.enterPressed}
            />
          </FormGroup>
          <FormGroup>
            <Label for="passWordAuth">Confirm Password</Label>
            <input
              className="effect-6"
              type="password"
              id="registerPart"
              placeholder={password}
              ref="passwordValid"
              onKeyUp={this.enterPressed}
            />
          </FormGroup>
          <Button style={{ float: "right" }} 
            onClick={this.updateInfo}>
            update
          </Button>
        </Form>
      </div>
    );
  }
}
