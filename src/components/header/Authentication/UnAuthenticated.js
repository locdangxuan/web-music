import React , { Component } from 'react';
import './Authentication.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label} from 'reactstrap';
import axios from 'axios';

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
        // this.Registertoggle = this.Registertoggle.bind(this);
        // this.loginToggle = this.loginToggle.bind(this);
        // this.loginBtn = this.loginBtn.bind(this);
        // this.enterPressed = this.enterPressed.bind(this);
        // this.registerBtn = this.registerBtn.bind(this);
        // this.accountAuthentication = this.accountAuthentication.bind(this);
    }
    render()
    {
        return(
            <div className = "Authentication">
                <div className = "Login">         
                    <Button outline color="primary" className = "Toggler"  onClick={this.loginToggle}>Login</Button>               
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
                            <Button color="secondary" className = "LoginBtn" onClick={this.loginBtn}>Login</Button>{' '}
                            <Button color="secondary" onClick={this.loginToggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div className = "Register">
                    <Button outline color="primary" className = "Toggler"  onClick={this.Registertoggle}>Register</Button>
                    <Modal isOpen={this.state.registermodal} toggle={this.Registertoggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
                        <ModalBody>
                            <Form>
                            <div className="effect-6">
                            <FormGroup>
                                <Label for="userName">Username</Label>
                                <input type="text" id = "registerPart"  placeholder="Username" ref= "userNameRegister" onKeyUp={this.enterPressed}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="passWord">Password</Label>
                                <input type="password" id = "registerPart" placeholder="Input Password" ref= "password" onKeyUp={this.enterPressed}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="passWordAuth">Password</Label>
                                <input type="password" id = "registerPart" placeholder="Input Password Again" ref= "passwordValid" onKeyUp={this.enterPressed}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Email">Email</Label>
                                <input type="text" id = "registerPart" placeholder="example@gmail.com" ref= "emailRegister" onKeyUp={this.enterPressed}/>
                            </FormGroup>
                            </div>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" className = "RegisterBtn" onClick={this.registerBtn}>Sign Up</Button>{' '}
                            <Button color="secondary" onClick={this.Registertoggle}>Cancel</Button>
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
        var password = this.refs.password.value;
        var passwordValid = this.refs.passwordValid.value;
        var email = this.refs.emailRegister.value;
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
                var user = {username : username,password: password,email: email};
                var newRegister = JSON.stringify(user);
                alert(newRegister);
                // axios.post('',newRegister)
                //      .then(response => 
                //         {
                //         this.setState({ registermodal: false});
                //         alert('Account successfully created');
                //         })
                //      .catch(error => console.log(error))
                axios.get('',newRegister)
                     .then(response => 
                        {
                        this.setState({ registermodal: false});
                        alert('Account successfully created');
                        })
                     .catch(error => console.log(error)) 
            }
        }
    }
    accountAuthentication = (username,password) => {
        // var user = {username: username,password: password};
        // var json = JSON.stringify(user);
        // axios.post('',json)
        //      .then(response => {
        //          console.log(response);
        //          localStorage.setItem('Token',JSON.parse(response.data[0]);
        //      })
        //      .catch(error => {
        //          alert('Loi~ ' + error);
        //      })
        axios.get(`http://localhost:4000/user/?username=${username}&password=${password}`)
             .then((response) =>
                {
                if(response.data[0]===undefined)    return false;
                else
                {                
                    if(response.data[0] === null)
                    {
                        return false;
                    }
                    else
                    {
                        console.log(response.data[0]);
                        localStorage.setItem('Token',JSON.stringify(response.data[0]));
                        console.log('Before');
                        this.loginToggle();
                        this.props.getValue(true);
                        console.log('After');
                        return true;
                    }
                }   
    
                })
             .catch(error => {
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