import React, { Component } from "react";
import "./Authenticated.css";
import Icon from "../../Image/gastly.svg";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server.js";
import { Alert } from "../../../confirmalert";
import  {UserContext}  from "../../../contexts/UserContext";

export default class Authenticated extends Component {
  constructor(props) {
    super(props);
    const token = JSON.parse(localStorage.getItem("Token"));
    let isLoggedIn = false;
    if (token !== null) {
      isLoggedIn = true;
    }
    this.state = {
      isLoggedIn, currentUser: token,
      username: token.username,
      modal: false,
      nestedModal: false,
      closeAll: false,
      warning: ''
    };
    this.logoutBtnClicked = this.logoutBtnClicked.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  enterPressed(event) {
    if (event.target.keycode === 13 && event.target.id === 'normal-info') {
      this.updateInfo();
    }
    if (event.target.keycode === 13 && event.target.id === 'password') {
      this.updateInfo();
    }
  }

  async updateInfo() {
    let username = (this.refs.username.length === 0) ? this.refs.username : this.state.currentUser.username;
    let firstname = (this.refs.firstname.length === 0) ? this.refs.firstname : this.state.currentUser.firstName;
    let lastname = (this.refs.lastname.length === 0) ? this.refs.lastname : this.state.currentUser.lastName;
    let email = (this.refs.email.length === 0) ? this.refs.email : this.state.currentUser.email;
    let updateUser = {
      username: username,
      firstName: firstname,
      lastName: lastname,
      email: email
    }
    console.log(updateUser);
    await axios({
      method: "PUT",
      url: server + "/api/users/update",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("Token")).token
      },
      data: updateUser
    })
      .then(response => {
        if (response.status === 200) {
          let userData = JSON.parse(localStorage.getItem("Token"));
          userData.username = updateUser.username;
          userData.firstName = updateUser.firstName;
          userData.lastName = updateUser.lastName;
          userData.email = updateUser.email;
          let storageUpdate = JSON.stringify(userData);
          this.setState({
            warning: response.data,
            currentUser: updateUser
          });
          localStorage.setItem("Token", storageUpdate);
        }
      })
      .catch(error => {
        this.setState({ warning: "Failed to update" });
      });
  }

  async updatePassword() {
    let oldPassword ;
    let newPassword ;
    let newPasswordValid ;
    if(oldPassword.length === 0||newPassword.length === 0||newPasswordValid.length === 0)
    {
      this.setState({
        warning : 'Please fill all the text fields!'
      })
    }
    else
    {
      if(newPassword !== newPasswordValid)
      {
        this.setState({
          warning : 'Password Validation does not match!'
        })
      }
      else
      {
        
      }
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  componentDidUpdate() {
    const storage = JSON.parse(localStorage.getItem("Token"));
    this.setState({
      currentUser: storage
    });
  }

  logoutBtnClicked() {
    this.props.getValue(false);
    axios({
      method: "POST",
      url: server + "/api/users/logout",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("Token")).token
      },
      data: { username: this.state.currentUser.username }
    })
      .then(response => {
        console.log(response.status);
        if (response.status === 200) {
          Alert("Message", "Logged out Succesfully!!!");
          localStorage.removeItem("Token");
        }
      })
      .catch(error => {
        Alert("Warning", error);
      });
  }

  render() {
    return (
      <div className="authenticated">
        <div className="avatar">
          <img src={Icon} width={40} alt="Icon" />
        </div>
        {/* <div className="logout-btn">
          <Button className="button" outline color="warning" onClick={this.toggle}>{`${currentUser.firstName} ${currentUser.lastName}`}</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Account's Information</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <input
                    className="effect-6"
                    type="text"
                    id="normal-info"
                    placeholder={currentUser.email}
                    ref="email"
                    onKeyUp={this.enterPressed}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="userName">Username</Label>
                  <input
                    className="effect-6"
                    type="text"
                    id="normal-info"
                    placeholder={currentUser.username}
                    ref="username"
                    onKeyUp={this.enterPressed}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="fullName">FullName</Label>
                  <Row>
                    <Col xs="6">
                      <input
                        className="effect-6"
                        type="text"
                        placeholder={currentUser.firstName}
                        ref="firstname"
                        id="normal-info"
                        onKeyUp={this.enterPressed}
                      />
                    </Col>
                    <Col xs="6">
                      <input
                        className="effect-6"
                        type="text"
                        placeholder={currentUser.lastName}
                        ref="lastname"
                        id="normal-info"
                        onKeyUp={this.enterPressed}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
              <br />
              <Button outline color="primary" onClick={this.toggleNested}>Change Password</Button>
              <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                <ModalHeader>Change Password</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="passWord">Old Password</Label>
                    <input
                      className="effect-6"
                      type="password"
                      placeholder="Input Old Password"
                      ref="password"
                      onKeyUp={this.enterPressed}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="passWord">New Password</Label>
                    <input
                      className="effect-6"
                      type="password"
                      placeholder="Input New Password"
                      ref="password"
                      onKeyUp={this.enterPressed}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="passWordAuth">Confirm New Password</Label>
                    <input
                      className="effect-6"
                      type="password"
                      placeholder="Input New Password Again"
                      ref="passwordValid"
                      onKeyUp={this.enterPressed}
                    />
                  </FormGroup>
                  <br /><br /><span className="warning">{this.state.warning}</span>
                </ModalBody>
                <ModalFooter>
                  <Button outline color="danger" onClick={this.toggleNested}>Update</Button>{' '}
                  <Button outline color="secondary" onClick={this.toggleNested}>Cancel</Button>{' '}
                </ModalFooter>
              </Modal>
              <br /><br /><span className="warning">{this.state.warning}</span>
            </ModalBody>
            <ModalFooter>
              <Button outline color="primary" onClick={this.updateInfo}>Update</Button>{' '}
              <Button outline color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div> */}
        <div className="user-info">
          <UserContext.Consumer>
            {({currentUser}) => (
          <Link
            className="user"
            to={`/info/${currentUser.firstName}_${currentUser.lastName}`}
          >
            <p>{currentUser.firstName + " " + currentUser.lastName}</p>
          </Link>)}
          </UserContext.Consumer>
        </div>
        <div className="logout-btn">
          <Link to={'/'}>
            <UserContext.Consumer>
              {({logoutFunction}) => (
            <Button onClick={()=> logoutFunction()} className="button">
              Logout
            </Button>)}
            </UserContext.Consumer>
          </Link>
        </div>
      </div>
    );
  }
}
