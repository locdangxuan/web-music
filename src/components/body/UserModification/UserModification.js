import React, { Component } from "react";
import { Form, FormGroup, Label, Row, Col } from "reactstrap";
import "./UserModification.css";
import { Button } from "reactstrap";
import { UserContext } from "../../../contexts/UserContext";
import { Animated } from "react-animated-css";

export default class UserModification extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      newPasswordValidation: ""
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  async onChangeHandler(event) {
    await this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    return (
      <div className="user-update">
        <Form className="user-modification">
          <Animated
            animationIn="fadeInLeft"
            animationOut="fadeOut"
            isVisible={true}
          >
            <UserContext.Consumer>
              {({ currentUser }) => (
                <div>
                  <h2 className="change-title text-center">CHANGE FULLNAME</h2>
                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <span
                      type="text"
                      id="loginPart"
                      className="disable"
                      name="email"
                      value={currentUser.email}
                      onChange={this.onChangeHandler}
                    > <br/>{currentUser.email}</span>
                  </FormGroup>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <span
                      className="disable"
                      type="text"
                      name="username"
                      value={currentUser.username}
                      onChange={this.onChangeHandler}
                    ><br/>{currentUser.username}</span>
                  </FormGroup>
                  <FormGroup>
                    <Label for="fullName">Fullname</Label>
                    <Row>
                      <Col xs="6">
                        <input
                          className="effect-6"
                          type="text"
                          name="firstName"
                          placeholder={currentUser.firstName}
                          onChange={this.onChangeHandler}
                        />
                      </Col>
                      <Col xs="6">
                        <input
                          className="effect-6"
                          type="text"
                          name="lastName"
                          placeholder={currentUser.lastName}
                          onChange={this.onChangeHandler}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </div>
              )}
            </UserContext.Consumer>
            <UserContext.Consumer>
              {({ message }) => (
                <div>
                  {message === "User successfully updated" && (
                    <span className="successful">{message}</span>
                  )}
                  {message === "Firstname is required" && (
                    <span className="warning">{message}</span>
                  )}
                </div>
              )}
            </UserContext.Consumer>
            <UserContext.Consumer>
              {({ changeInfo }) => (
                <Button
                  outline
                  color="primary"
                  style={{ float: "right" }}
                  onClick={() =>
                    changeInfo(
                      this.state.username,
                      this.state.email,
                      this.state.firstName,
                      this.state.lastName
                    )
                  }
                >
                  Update
                </Button>
              )}
            </UserContext.Consumer>
          </Animated>
          <br />
          <br />
          <br />
          <Animated
            animationIn="fadeInRight"
            animationOut="fadeOut"
            isVisible={true}
          >
            <h2 className="change-title text-center">CHANGE PASSWORD</h2>
            <FormGroup>
              <Label for="password">Old Password</Label>
              <input
                className="effect-6"
                type="password"
                name="oldPassword"
                onChange={this.onChangeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">New Password</Label>
              <input
                className="effect-6"
                type="password"
                name="newPassword"
                onChange={this.onChangeHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="passwordAuth">Confirm New Password</Label>
              <input
                className="effect-6"
                type="password"
                name="newPasswordValidation"
                onChange={this.onChangeHandler}
              />
            </FormGroup>
            <UserContext.Consumer>
              {({ changePassword, passwordMessage }) => (
                <div>
                  <Button
                    outline
                    color="primary"
                    style={{ float: "right" }}
                    onClick={() => {
                      changePassword(
                        this.state.oldPassword,
                        this.state.newPassword,
                        this.state.newPasswordValidation
                      );
                    }}
                  >
                    Change
                  </Button>
                  <span className="warning">{passwordMessage}</span>
                </div>
              )}
            </UserContext.Consumer>
          </Animated>
        </Form>
      </div>
    );
  }
}
