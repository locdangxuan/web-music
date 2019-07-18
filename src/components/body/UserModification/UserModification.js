import React, { Component } from "react";
import { Form, FormGroup, Label, Row, Col } from "reactstrap";
import "./UserModification.css";
// import axios from "axios";
import { Button } from "reactstrap";
// import { server } from "../../../server";
import { UserContext } from "../../../contexts/UserContext";

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

  // componentWillMount(){
  //   this.setState = {
  //     email: this.refs.email.value,
  //     firstName: this.refs.firstName.value,
  //     lastName: this.refs.lastName.value,
  //     username: this.refs.username.value,
  //     password: this.refs.password.value,
  //     passwordValid: this.refs.passwordValid.value   
  //   }
  // }

  componentDidMount() {
    const storage = localStorage.getItem("Token");
    if (storage !== null) {
      const currentUser = JSON.parse(storage);
      this.refs.username.value = currentUser.username;
      this.refs.firstName.value = currentUser.firstName;
      this.refs.lastName.value = currentUser.lastName;
      this.refs.email.value = currentUser.email;
    }
  }

  // updateInfo = () => {
  //   let storage = localStorage.getItem("Token");
  //   console.log(storage);
  //   if (storage !== null) {
  //     let username = this.refs.username.value;
  //     let firstName = this.refs.firstName.value;
  //     let lastName = this.refs.lastName.value;
  //     let password = this.refs.password.value;
  //     let passwordValid = this.refs.passwordValid.value;
  //     let email = this.refs.email.value;
  //     let userData = JSON.parse(storage);
  //     if (
  //       username === "" ||
  //       firstName === "" ||
  //       password === "" ||
  //       passwordValid === "" ||
  //       email === "" ||
  //       lastName === ""
  //     )
  //       alert("Please fill all the information below");
  //     else {
  //       if (username.length < 8) {
  //         alert("username does not match required length ( 8 letters or more )");
  //       } else {
  //         if (password !== passwordValid) {
  //           alert("passwords does not match each others");
  //         } else {
  //           let updateUser = {
  //             username: username,
  //             password: password,
  //             email: email,
  //             firstName: firstName,
  //             lastName: lastName
  //           };
  //           axios({
  //             method: "PUT",
  //             headers: {
  //               Authorization:
  //                 "Bearer " + userData.token
  //             },
  //             url: server + `/api/users/${userData._id}`,
  //             data: {
  //               updateUser
  //             }
  //           })
  //             .then(response => {
  //               console.log(response.status);
  //               if (response.status === 200) {
  //                 alert(response.data);
  //                 userData.username = username;
  //                 userData.email = email;
  //                 userData.firstName = firstName;
  //                 userData.lastName = lastName;
  //                 storage = JSON.stringify(userData);
  //                 console.log(storage);
  //                 localStorage.setItem("Token", storage);
  //               }
  //             })
  //             .catch(error => {
  //               alert(
  //                 "Failed to update"
  //               );
  //               console.log(error);
  //             });
  //         }
  //       }
  //     }
  //   }
  // }
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
            <Label for="username">Username</Label>
            <input
              className="effect-6"
              type="text"
              id="registerPart"
              placeholder=""
              ref="username"
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
                  ref="firstName"
                />
              </Col>
              <Col xs="6">
                <input
                  className="effect-6"
                  type="text"
                  id="registerPart"
                  placeholder=""
                  ref="lastName"
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <input
              className="effect-6"
              type="password"
              id="registerPart"
              placeholder=""
              ref="password"
              onKeyUp={this.enterPressed}
              onChange=""
            />
          </FormGroup>
          <FormGroup>
            <Label for="passwordAuth">Confirm Password</Label>
            <input
              className="effect-6"
              type="password"
              id="registerPart"
              placeholder=""
              ref="passwordValid"
              onKeyUp={this.enterPressed}
            />
          </FormGroup>
          {/* <UserContext.Consumer>
            {({ clickToUpdate }) => (
              <Button
              style={{ float: "right" }}
              onClick={() => clickToUpdate(updateUser)}
            >
              update
            </Button>
            )}
          </UserContext.Consumer> */}
          <Button
              style={{ float: "right" }}
            >
              update
            </Button>
        </Form>
      </div>
    );
  }
}
