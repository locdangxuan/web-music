import React, {Component} from 'react';
import Login from './Login';
import SignUp from './SignUp'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, Input } from 'reactstrap';

export default class Authentication extends Component{
    render(){
        return(
            <Row className="authentication">
                <Col md="6">
                    <Login/>
                </Col>
                <Col md="6">
                    <SignUp/>
                </Col>
                
            </Row>
        )
    }
}