import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Row, Col } from "reactstrap";
import axios from "axios";
import "./UnAuthenticated.css";
import { server } from "../../../server";
import { UserContext } from "../../../contexts/UserContext";
import { Alert } from "../../../confirmalert";

export default class UnAuthenticated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginModal: false,
            registerModal: false,
            emailWarning: "",
            usernameWarning: "",
            fullNameWarning: "",
            passwordWarning: "",
            passwordValidWarning: "",
            finalWarning: ""
        };
        this.loginToggle = this.loginToggle.bind(this);
        this.registerToggle = this.registerToggle.bind(this);
        this.registerBtn = this.registerBtn.bind(this);
        this.checkField = this.checkField.bind(this);
        this.checkFieldEmail = this.checkFieldEmail.bind(this);
        this.checkSpecialCharacter = this.checkSpecialCharacter.bind(this);
    }
    render() {
        return (
            <div className="un-authenticated">
                <div className="login">
                    <UserContext.Consumer>
                        {({ resetMessage }) => (
                            <Button
                                className="button"
                                onClick={() => {
                                    this.loginToggle();
                                    resetMessage();
                                }}>
                                Login
                            </Button>
                        )}
                    </UserContext.Consumer>
                    <Modal
                        isOpen={this.state.loginModal}
                        toggle={this.loginToggle}
                        className={this.props.className}>
                        <ModalHeader toggle={this.loginToggle}>Login</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <br />
                                    <input
                                        type="text"
                                        className="effect-6"
                                        placeholder="Username"
                                        ref="usernameLogin"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <br />
                                    <div>
                                        <input
                                            type="password"
                                            id="loginPart"
                                            className="effect-6"
                                            placeholder="Input Password"
                                            ref="passwordLogin"
                                        />
                                    </div>
                                </FormGroup>
                            </Form>
                            <UserContext.Consumer>
                                {({ message }) => <span className="warning">{message}</span>}
                            </UserContext.Consumer>
                        </ModalBody>
                        <ModalFooter>
                            <UserContext.Consumer>
                                {({ loginFunction }) => (
                                    <Button
                                        outline
                                        color="primary"
                                        className="LoginBtn"
                                        onClick={() =>
                                            loginFunction(
                                                this.refs.usernameLogin.value,
                                                this.refs.passwordLogin.value
                                            )
                                        }
                                        onKeyUp={event => {
                                            if (event.keyCode === 13) {
                                                loginFunction(
                                                    this.refs.usernameLogin.value,
                                                    this.refs.passwordLogin.value
                                                );
                                            }
                                        }}
                                    >
                                        Login
                  </Button>
                                )}
                            </UserContext.Consumer>
                            {"  "}
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
                                    />
                                </FormGroup>
                                <span className="warning-register">
                                    {this.state.emailWarning}
                                </span>
                                <FormGroup>
                                    <Label for="userName">Username</Label>
                                    <input
                                        className="effect-6"
                                        type="text"
                                        id="registerPart"
                                        placeholder="Username"
                                        ref="userNameRegister"
                                    />
                                </FormGroup>
                                <span className="warning-register">
                                    {this.state.usernameWarning}
                                </span>
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
                                            />
                                        </Col>
                                        <Col xs="6">
                                            <input
                                                className="effect-6"
                                                type="text"
                                                id="registerPart"
                                                placeholder="Last Name"
                                                ref="lastname"
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <span className="warning-register">
                                    {this.state.fullNameWarning}
                                </span>
                                <FormGroup>
                                    <Label for="passWord">Password</Label>
                                    <input
                                        className="effect-6"
                                        type="password"
                                        id="registerPart"
                                        placeholder="Input Password"
                                        ref="password"
                                    />
                                </FormGroup>
                                <span className="warning-register">
                                    {this.state.passwordWarning}
                                </span>
                                <FormGroup>
                                    <Label for="passWordAuth">Confirm Password</Label>
                                    <input
                                        className="effect-6"
                                        type="password"
                                        id="registerPart"
                                        placeholder="Input Password Again"
                                        ref="passwordValid"
                                    />
                                </FormGroup>
                                <span className="warning-register">
                                    {this.state.passwordValidWarning}
                                </span>
                            </Form>
                            <span className="warning-register">
                                {this.state.finalWarning}
                            </span>
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

    registerToggle() {
        this.setState(prevState => ({
            registermodal: !prevState.registermodal,
            loginModal: prevState.loginModal,
            emailWarning: "",
            usernameWarning: "",
            fullNameWarning: "",
            passwordWarning: "",
            passwordValidWarning: ""
        }));
    }

    loginToggle() {
        this.setState(prevState => ({
            loginModal: !prevState.loginModal,
            registermodal: prevState.registermodal
        }));
    }

    checkSpecialCharacter(text) {
        // eslint-disable-next-line no-useless-escape
        let format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        if (!format.test(text)) {
            return true;
        } else {
            return false;
        }
    }

    checkFieldEmail() {
        let email = this.refs.emailRegister.value;
        let at = email.indexOf("@");
        let dot = email.lastIndexOf(".");
        let space = email.indexOf(" ");
        if (at !== -1 && at !== 0 && dot !== -1 && dot > at + 1 && dot < email.length - 1 && space === -1) {
            return false;
        } else {
            return true;
        }
    }

    checkField(username, firstName, lastName, password, passwordValid, email) {
        let result = true;
        let usernameWarning = '';
        let emailWarning = '';
        let passwordWarning = '';
        let passwordValidWarning = '';
        let fullNameWarning = '';
        if (firstName.length === 0 || lastName.length === 0) {
            fullNameWarning = "Please input both Firstname and Lastname";
            result = false;
        }

        if (this.checkFieldEmail()) {
            emailWarning += "Invalid email format";
            result = false;
        }

        if (username.length < 8) {
            usernameWarning +=
                "Username does not match required length ( 8 letters or more )";
            result = false;
        } else if (!this.checkSpecialCharacter(username)) {
            usernameWarning += "Username contains illegal characters";
            result = false;
        }

        if (password.length < 8) {
            passwordWarning +=
                "Password does not match required length ( 8 letters or more )";
            result = false;
        }

        if (password !== passwordValid) {
            passwordValidWarning += "Validation password does not match";
            result = false;
        }
        return {
            status: result,
            usernameWarning: usernameWarning,
            emailWarning: emailWarning,
            passwordWarning: passwordWarning,
            passwordValidWarning: passwordValidWarning,
            fullNameWarning: fullNameWarning
        };
    }

    registerBtn() {
        let username = this.refs.userNameRegister.value;
        let firstName = this.refs.firstname.value;
        let lastName = this.refs.lastname.value;
        let password = this.refs.password.value;
        let email = this.refs.emailRegister.value;
        let passwordValid = this.refs.passwordValid.value;
        let result = this.checkField(
            username,
            firstName,
            lastName,
            password,
            passwordValid,
            email
        );
        if (!result.status) {
            this.setState({
                usernameWarning: result.usernameWarning,
                emailWarning: result.emailWarning,
                passwordWarning: result.passwordWarning,
                passwordValidWarning: result.passwordValidWarning,
                fullNameWarning: result.fullNameWarning
            });
        } else {
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
                    if (response.status === 201) {
                        this.setState({
                            registermodal: false,
                            emailWarning: "",
                            usernameWarning: "",
                            fullNameWarning: "",
                            passwordWarning: "",
                            passwordValidWarning: "",
                            finalWarning: "User was successfully created"
                        });
                        Alert("Message", "User was successfully created", true);
                    }
                })
                .catch(error => {
                    this.setState({
                        emailWarning: "",
                        usernameWarning: "",
                        fullNameWarning: "",
                        passwordWarning: "",
                        passwordValidWarning: "",
                        finalWarning: error.response.data.message
                    });
                });
        }
    }
}
