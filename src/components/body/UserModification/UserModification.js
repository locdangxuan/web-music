import React, { Component } from "react";
import { Form, FormGroup, Label, Row, Col } from "reactstrap";
import "./UserModification.css";
import { Button } from "reactstrap";
import { UserContext } from "../../../contexts/UserContext";

export default class UserModification extends Component {
  constructor(props) {
    super(props);
    const storage = localStorage.getItem("Token");
    if (storage !== null) {
      const currentUser = JSON.parse(storage);
      let textInput = React.createRef();
      this.state = {
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        username: currentUser.username,
        password: "",
        passwordValid: "",
        textInput: textInput,
      };
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {({
          updateUsername,
          updatePassword,
          updateFirstName,
          updateLastName,
          updatePasswordValid,
          updateEmail,
          updateClick,
          warning,
          textInput
        }) => (
            <div className="user-update">
              <Form className="user-modification">
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <input
                    className="effect-6"
                    type="text"
                    placeholder={this.state.email}
                    ref={textInput}
                    onChange={event => {
                      updateEmail(event.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <input
                    className="effect-6"
                    type="text"
                    placeholder={this.state.username}
                    ref={textInput}
                    onChange={event => {
                      updateUsername(event.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="fullName">Fullname</Label>
                  <Row>
                    <Col xs="6">
                      <input
                        className="effect-6"
                        type="text"
                        ref={textInput}
                        placeholder={this.state.firstName}
                        onChange={event => {
                          updateFirstName(event.target.value);
                        }}
                      />
                    </Col>
                    <Col xs="6">
                      <input
                        className="effect-6"
                        type="text"
                        ref={textInput}
                        placeholder={this.state.lastName}
                        onChange={event => {
                          updateLastName(event.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <input
                    className="effect-6"
                    type="password"
                    ref={textInput}
                    onChange={event => {
                      updatePassword(event.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="passwordAuth">Confirm Password</Label>
                  <input
                    className="effect-6"
                    type="password"
                    ref={textInput}
                    onChange={event => {
                      updatePasswordValid(event.target.value);
                    }}
                  />
                </FormGroup>
                <div className="warning">{warning}</div>
                <Button
                  outline
                  color="danger"
                  style={{ float: "right" }}
                  onClick={() => updateClick()}
                >
                  Update
              </Button>
              </Form>
            </div>
          )}
      </UserContext.Consumer>
    );
  }
}
