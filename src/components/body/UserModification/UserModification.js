import React, { Component } from "react";
import { Form, FormGroup, Label, Row, Col } from "reactstrap";
import "./UserModification.css";
import axios from "axios";
import { Button } from "reactstrap";
import { server } from "../../../server";
// import { lovely_server } from "../../../server";

export default class UserModification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      passwordValid: ""
    };
  }

  componentDidMount() {
    const storage = localStorage.getItem('Token');
    if (storage !== null) {
      const currentUser = JSON.parse(storage);
      this.refs.userName.value = currentUser.username;
      this.refs.firstname.value = currentUser.firstName;
      this.refs.lastname.value = currentUser.lastName;
      this.refs.email.value = currentUser.email;
    }
  }

  updateInfo = () => {
    const storage = localStorage.getItem("Token");
    if (storage !== null) {
      let username = this.refs.userName.value;
      let firstName = this.refs.firstname.value;
      let lastName = this.refs.lastname.value;
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
        alert("Please fill all the information below");
      else {
        if (username.length < 8) {
          alert("username does not match required length ( 8 letters or more )");
        } else {
          if (password !== passwordValid) {
            alert("passwords does not match each others");
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
                Authorization:
                  "Bearer " + JSON.parse(storage).token
              },
              url: server + "/api/users/:id",
              data: {
                updateUser
              }
            })
              .then(response => {
                console.log(response.status);
                if (response.status === 200) {
                  alert("Successfully updated !!!");
                }
              })
              .catch(error => {
                alert(
                  "Failed to update"
                );
                console.log(error);
              });
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="user-update">
        <Form className="user-modification">
          <FormGroup>
            <Label for="Email">Email</Label>
            <input
              className="effect-6"
              type="text"
              id="registerPart"
              placeholder=""
              ref="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="userName">Username</Label>
            <input
              className="effect-6"
              type="text"
              id="registerPart"
              placeholder=""
              ref="userName"
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
                  placeholder=""
                  ref="firstname"
                />
              </Col>
              <Col xs="6">
                <input
                  className="effect-6"
                  type="text"
                  id="registerPart"
                  placeholder=""
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
              placeholder=""
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
              placeholder=""
              ref="passwordValid"
              onKeyUp={this.enterPressed}
            />
          </FormGroup>
          <Button style={{ float: "right" }} onClick={this.updateInfo}>
            update
          </Button>
        </Form>
      </div>
    );
  }
}
