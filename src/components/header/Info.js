import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    Button,
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Label,
    Input } from 'reactstrap';
import './Info.css';

class Info extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind();
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        return(
            <div className = "info">
                <Row>
                    <Col xs = "6">
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret>
                            Log in
                            </DropdownToggle>
                            <DropdownMenu className = "Login"> 
                                <Form inline>
                                    <FormGroup>
                                        <Label for="exampleEmail" 
                                            className = "loginEmail">
                                                Email
                                        </Label>
                                        <Input type="email" 
                                            name="email" 
                                            id="exampleEmail" 
                                            placeholder="something@idk.cool" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="examplePassword" className="loginPassword">Password</Label>
                                        <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
                                    </FormGroup>
                                    <Button>Submit</Button>
                                </Form>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Col>
                    <Col xs = "6">
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret>
                            Sign up
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Col>
                </Row>
               
                
            </div>
        )
    }
}

export default Info;