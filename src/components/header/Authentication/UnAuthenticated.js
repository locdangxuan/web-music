import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Row, Col } from "reactstrap";
import axios from "axios";
import "./UnAuthenticated.css";
import { server } from "../../../server";
import  {UserContext}  from "../../../contexts/UserContext";


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
    this.registerBtn = this.registerBtn.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
  }
  render() {
    return (
      <div className="un-authenticated">     
        <div className="login">
          <Button className="button" onClick={this.loginToggle}>
            Login
          </Button>
          <Modal
            isOpen={this.state.loginModal}
            toggle={this.loginToggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.loginToggle}>Login</ModalHeader>
            <span className = "warning">{this.state.registerAlert}</span>
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
                  />
                </FormGroup>
              </Form>
              <UserContext.Consumer>
              {({message}) => (
              <span>{message}</span>)}
              </UserContext.Consumer>
            </ModalBody>
            <ModalFooter>
            <UserContext.Consumer>
            {({loginFunction}) => (
              <Button
                outline
                color="primary"
                className="LoginBtn"
                onClick={() => loginFunction(this.refs.usernameLogin.value,this.refs.passwordLogin.value)}
              >
                Login
              </Button>
              )}
              </UserContext.Consumer>{"  "}
              <Button outline color="primary" onClick={this.loginToggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>    
        <div className="register">
          <Button className="button" onClick={this.registerToggle}>
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
              <span className = "warning">{this.state.registerAlert}</span>
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
      loginModal: prevState.loginModal,
      registerAlert: ''
    }));
  };

  loginToggle = () => {
    this.setState(prevState => ({
      loginModal: !prevState.loginModal,
      registermodal: prevState.registermodal,
      loginAlert: ''
    }));
  };

  enterPressed(event) {
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
      this.setState({ registerAlert: 'Please fill all the information below' });
    else {
      if (username.length < 8) {
        this.setState({ registerAlert: "Username does not match required length ( 8 letters or more )" });
      } else {
        if (password !== passwordValid) {
          this.setState({ registerAlert: "Validation password does not match" });
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
            .post(server + "/api/users/register", newUser)
            .then(response => {
              this.setState({
                registermodal: false,
                loginModal: true,
                registerAlert: response.data.message
              });
            })
            .catch(error => {
              console.log(error);
              this.setState({
                registerAlert: 'Unable to register'
              });
            });
        }
      }
    }
  };

}
