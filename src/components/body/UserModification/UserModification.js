import React, { Component } from "react";
import { Form, FormGroup, Label, Row, Col } from "reactstrap";
import "./UserModification.css";
import { Button } from "reactstrap";
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
      passwordValid: "",
      warning: ""
    };
  }

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

  renderInfo = () => {
    let username = this.refs.username.value ;
    let firstName = this.refs.firstName.value;
    let lastName = this.refs.lastName.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    let updateUser = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName
    };
    console.log(updateUser);
  }
  
  render() {
    
    return (
      <UserContext.Consumer>
      {({updateUsername, updatePassword, updateFirstName, updateLastName, updateValidPassowrd, updateEmail}) => (
         <div className="user-update">
         <Form className="user-modification">
           <FormGroup>
             <Label for="Email">Email</Label>
             <input
               className="effect-6"
               type="text"
               ref="email"
               onChange={event => {
                 updateEmail(event.target.value)
               }}
             />
           </FormGroup>
           <FormGroup>
             <Label for="username">Username</Label>
             <input
               className="effect-6"
               type="text"
               ref="username"
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
                   ref="firstName"
                   onChange={event => {
                    updateFirstName(event.target.value)
                  }}
                 />
               </Col>
               <Col xs="6">
                 <input
                   className="effect-6"
                   type="text"
                   ref="lastName"
                   onChange={event => {
                    updateLastName(event.target.value)
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
               ref="password"
               onChange={event => {
                updatePassword(event.target.value)
              }}
             />
           </FormGroup>
           <FormGroup>
             <Label for="passwordAuth">Confirm Password</Label>
             <input
               className="effect-6"
               type="password"
               ref="passwordValid"
               onChange={event => {
                updateValidPassowrd(event.target.value)
              }}
             />
           </FormGroup>
           <div className="warning">{this.state.warning}</div>
           <Button
             outline
             color="danger"
             style={{ float: "right" }}
            //  onClick={this.renderInfo}
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
