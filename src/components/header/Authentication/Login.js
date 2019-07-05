import React , { Component } from 'react';
import './Authentication.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label} from 'reactstrap';

export default class Login extends Component
{
    constructor()
    {
        super();
        this.state = 
        {
            loginmodal : false,
            loginSuccess : false
        }
        this.loginToggle = this.loginToggle.bind(this);
        this.loginBtn = this.loginBtn.bind(this);
    }
    render()
    {

        return(
            <div>
                <Button outline color="danger" className = "Toggler"  onClick={this.loginToggle}>Login</Button>               
                 <Modal isOpen={this.state.loginmodal} toggle={this.loginToggle} className={this.props.className}>
                 <ModalHeader toggle={this.loginToggle}>Login</ModalHeader>
                 <ModalBody>
                  <Form>
                  <FormGroup>
                   <br/>
                   <input type="text" className="effect-6" placeholder="Username" ref = "username" onKeyUp={this.enterPressed}/>   
                  </FormGroup>
                  <FormGroup>                 
                   <br/>
                   <input type="password" className="effect-6" placeholder="Input Password" ref = "password" onKeyUp={this.enterPressed}/>                        
                  </FormGroup>
                  </Form>
                 </ModalBody>
                 <ModalFooter>
                  <Button outline color = "warning" className = "LoginBtn" onClick={this.loginBtn}>Login</Button>{' '}
                  <Button outline color = "warning" onClick={this.loginToggle}>Cancel</Button>
                 </ModalFooter>
                 </Modal>
            </div>
        )
    }

    loginToggle() 
    {
        this.setState(prevState => ({
            loginmodal: !prevState.loginmodal,
            registermodal: prevState.registermodal,
            isSignedIn : prevState.isSignedIn,
        }));
    }

    enterPressed(event)
    {
        if(event.keyCode === 13 && event.target.id === 'loginPart')
            this.loginBtn();
    }

    loginBtn()
    {
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        var valid = this.accountAuthentication(username,password);
        console.log(this.state.user);
        if( valid === false)
        {
            alert('Invalid Username or Password');
        }
        else{
            this.setState({
                ...this.state,
                isSignedIn: true
            })
        }
    }
}