import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Row, Col } from "reactstrap";
import axios from "axios";
import "./UnAuthenticated.css";

import { confirmAlert } from 'react-confirm-alert';

export default class UnAuthenticated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      registerModal: false,
      registerAlert: '',
      loginAlert: ''
    };
    this.loginToggle = this.loginToggle.bind(this);
    this.registerToggle = this.registerToggle.bind(this);
    this.loginBtn = this.loginBtn.bind(this);
    this.registerBtn = this.registerBtn.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
    this.accountAuthentication = this.accountAuthentication.bind(this);
  }
  render() {
    return (
      <div className="unauthenticated">
        <div className="login">
          <Button className="btn-login" onClick={this.loginToggle}>
            Login
          </Button>
          <Modal
            isOpen={this.state.loginModal}
            toggle={this.loginToggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.loginToggle}>Login</ModalHeader>
            <span>{this.state.registerAlert}</span>
            <ModalBody>
              <Form>
                <FormGroup>
                  <br />
                  <input
                    type="text"
                    id="loginPart"
                    className="effect-6"
                    placeholder="Username"
                    ref="usernameLogin"
                    onKeyUp={this.enterPressed}
                  />
                </FormGroup>
                <FormGroup>
                  <br />
                  <input
                    type="password"
                    id="loginPart"
                    className="effect-6"
                    placeholder="Input Password"
                    ref="passwordLogin"
                    onKeyUp={this.enterPressed}
                  />
                </FormGroup>
              </Form>
              <span>{this.state.loginAlert}</span>
            </ModalBody>
            <ModalFooter>
              <Button
                outline color="primary"
                className="LoginBtn"
                onClick={this.loginBtn}
              >
                Login
              </Button>{" "}
              <Button outline color="primary" onClick={this.loginToggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <div className="register">
          <Button className="btn-register" onClick={this.registerToggle}>
            Register
          </Button>
          <Modal
            isOpen={this.state.registermodal}
            toggle={this.registerToggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.registerToggle}>Sign Up</ModalHeader>
            <ModalBody>
              <Form>
              <FormGroup>
                  <Label for="Email">Email</Label>
                  <input
                    className="effect-6"
                    type="text"
                    id="registerPart"
                    placeholder="example@gmail.com"
                    ref="emailRegister"
                    onKeyUp={this.enterPressed}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="userName">Username</Label>
                  <input
                    className="effect-6"
                    type="text"
                    id="registerPart"
                    placeholder="Username"
                    ref="userNameRegister"
                    onKeyUp={this.enterPressed}
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
                        placeholder="First Name"
                        ref="firstname"
                        onKeyUp={this.enterPressed}
                      />
                    </Col>
                    <Col xs="6">
                      <input
                        className="effect-6"
                        type="text"
                        id="registerPart"
                        placeholder="Last Name"
                        ref="lastname"
                        onKeyUp={this.enterPressed}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <input
                    className="effect-6"
                    type="text"
                    id="registerPart"
                    placeholder="example@gmail.com"
                    ref="emailRegister"
                    onKeyUp={this.enterPressed}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="passWord">Password</Label>
                  <input
                    className="effect-6"
                    type="password"
                    id="registerPart"
                    placeholder="Input Password"
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
                    placeholder="Input Password Again"
                    ref="passwordValid"
                    onKeyUp={this.enterPressed}
                  />
                </FormGroup>

              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                outline
                color="primary"
                className="RegisterBtn"
                onClick={this.registerBtn}
              >
                Sign Up
              </Button>{" "}
              <Button outline color="primary" onClick={this.registerToggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }

  registerToggle = () => {
    this.setState(prevState => ({
      registermodal: !prevState.registermodal,
      loginModal: prevState.loginModal
    }));
  };

  loginToggle = () => {
    this.setState(prevState => ({
      loginModal: !prevState.loginModal,
      registermodal: prevState.registermodal,
    }));
  };

  enterPressed = event => {
    if (event.keyCode === 13 && event.target.id === "loginPart")
      this.loginBtn();
    else if (event.keyCode === 13 && event.target.id === "registerPart")
      this.registerBtn();
  };

  registerBtn = () => {
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
          this.Registertoggle();
          var newUser = {
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName
          };

          // axios post automatically transform user to JSON file
          axios
            .post(
              "https://gorgeous-grand-teton-66654.herokuapp.com/api/users/register",
              newUser
            )
            .then(response => {
              this.setState({ registermodal: false, loginModal: true, registerAlert: response.data });
            })
            .catch(error => console.log(error));
        }
      }
    }
  };

  async accountAuthentication(username, password) {
    var user = { username: username, password: password };
    // axios post automatically transform user to JSON file
    await axios.post("https://lovely-hot-springs-99494.herokuapp.com/api/users/authenticate", user)
      .then(response => {
        localStorage.setItem("Token", JSON.stringify(response.data));
        this.props.getValue(true);
        console.log(1);
        return true;
      })
      .catch(error => {
        return false;
      });
  };

  loginBtn() {
    let username = this.refs.usernameLogin.value;
    let password = this.refs.passwordLogin.value;
    let valid = this.accountAuthentication(username, password);
    console.log(valid);
    if (valid === false) {
      this.setState({ loginAlert: "Invalid Username or Password" });
      console.log('Fail')
    }
    else {
      // this.loginToggle();
    }
  };
}
