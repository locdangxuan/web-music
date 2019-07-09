import React , { Component } from 'react';
import './Authentication.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Row, Col} from 'reactstrap';
import axios from 'axios';
import './UnAuthenticated.css';

export default class UnAuthenticated extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            loginmodal : false,
            registermodal: false,
        }
    }
    render()
    {
        return(
            <div className = "Authentication">
                <div className = "Login">         
                    <Button outline  className = "btnLogin"  onClick={this.loginToggle}>Login</Button>               
                        <Modal isOpen={this.state.loginmodal} toggle={this.loginToggle} className={this.props.className}>
                        <ModalHeader toggle={this.loginToggle}>Login</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <br/>
                                    <input type="text" id = "loginPart" className="effect-6" placeholder="Username" ref = "usernameLogin" onKeyUp={this.enterPressed}/>   
                                </FormGroup>
                                <FormGroup>                 
                                    <br/>
                                    <input type="password" id = "loginPart" className="effect-6" placeholder="Input Password" ref = "passwordLogin" onKeyUp={this.enterPressed}/>                        
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" className = "LoginBtn" onClick={this.loginBtn}>Login</Button>{' '}
                            <Button color="primary" onClick={this.loginToggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div className = "Register">
                    <Button outline  className = "btnRegister" onClick={this.Registertoggle}>Register</Button>
                    <Modal isOpen={this.state.registermodal} toggle={this.Registertoggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="userName">Username</Label>
                                    <input className="effect-6" type="text" id = "registerPart"  placeholder="Username" ref= "userNameRegister" onKeyUp={this.enterPressed}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fullName">Fullname</Label>
                                    <Row>
                                        <Col xs = "6">
                                        <input className="effect-6" type="text" id = "registerPart" placeholder="First Name" ref= "firstname" onKeyUp={this.enterPressed}/>
                                        </Col>
                                        <Col xs = "6">
                                        <input className="effect-6" type="text" id = "registerPart" placeholder="Last Name" ref= "lastname" onKeyUp={this.enterPressed}/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="passWord">Password</Label>
                                    <input className="effect-6" type="password" id = "registerPart" placeholder="Input Password" ref= "password" onKeyUp={this.enterPressed}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="passWordAuth">Password</Label>
                                    <input className="effect-6" type="password" id = "registerPart" placeholder="Input Password Again" ref= "passwordValid" onKeyUp={this.enterPressed}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Email">Email</Label>
                                    <input className="effect-6" type="text" id = "registerPart" placeholder="example@gmail.com" ref= "emailRegister" onKeyUp={this.enterPressed}/>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button outline color="primary" className = "RegisterBtn" onClick={this.registerBtn}>Sign Up</Button>{' '}
                            <Button outline color="primary" onClick={this.Registertoggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>           
                </div>    
            </div>
        )  
    }
    Registertoggle = () => { 
        this.setState(prevState => ({
            registermodal: !prevState.registermodal,
            loginmodal: prevState.loginmodal,
        }));
    }
    loginToggle = () => {
        this.setState(prevState => ({
            loginmodal: !prevState.loginmodal,
            registermodal: prevState.registermodal,
            isSignedIn : prevState.isSignedIn,
        }));
    }
    
    enterPressed = (event) => {
        if(event.keyCode === 13 && event.target.id === 'loginPart')
            this.loginBtn();
        else if (event.keyCode === 13 && event.target.id === 'registerPart')
            this.registerBtn();
    }
    registerBtn = () => {
        var username = this.refs.userNameRegister.value;
        var firstName = this.refs.firstname.value;
        var lastName = this.refs.lastname.value;
        var password = this.refs.password.value;
        var passwordValid = this.refs.passwordValid.value;
        var email = this.refs.emailRegister.value;
        if(username === '' || firstName === ''|| password === '' || passwordValid === '' || email === '' || lastName === '')
            alert('Please fill all the information below');
        else
        {
            if(username.length <8)
            {
                alert('username does not match required length ( 8 letters or more )');
            }
            else
            {
                if(password !== passwordValid)
                {
                    alert('passwords does not match each others');
                }
                else
                {
                    var newUser = {username : username,password: password,email: email,firstName : firstName,lastName: lastName};
                    // axios post automatically transform user to JSON file
                    axios.post('https://gorgeous-grand-teton-66654.herokuapp.com/api/users/register',newUser)
                         .then(response => 
                            {
                            this.setState({ registermodal: false});
                            alert(response.data);
                            })
                         .catch(error => console.log(error))
                }
            }
        }
    }
    accountAuthentication = (username, password) => {
        var user = {username: username,password: password};
        // axios post automatically transform user to JSON file
        axios.post('https://lovely-hot-springs-99494.herokuapp.com/api/users/authenticate',user)
             .then(response => {
                 console.log(response);
                 localStorage.setItem('Token',JSON.stringify(response.data));
                 console.log(JSON.stringify(response.data[0]));
                 this.loginToggle();
                 this.props.getValue(true);
                 return true;
             })
             .catch(error => {
                 alert('Loi~ ' + error);
                 return false;
             })
    }

    loginBtn = () => {
        var username = this.refs.usernameLogin.value;
        var password = this.refs.passwordLogin.value;
        var valid = this.accountAuthentication(username,password);
        if( valid === false)
        {
            alert('Invalid Username or Password');
        }
    }
    
}