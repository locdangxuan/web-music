import React, {Component} from 'react';
import Login from './Login';
import Register from './Register'
import { Row, Col } from 'reactstrap';

export default class Authentication extends Component{
    render(){
        return(
            <Row className="authentication">
                <Col md="6">
                    <Login/>
                </Col>
                <Col md="6">
                    <Register/>
                </Col>
                
            </Row>
        )
    }
}