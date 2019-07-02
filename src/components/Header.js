import React, { Component } from 'react';
import './Header.css'
import Logo from './header/Logo';
import Search from './header/Search';
import Authentication from './header/Authentication'
import { Row, Col } from 'reactstrap';


class Header extends Component{
    render(){
       return (
           <div className="header">
               <div className="container">
                <Row>
                        <Col xs="2" className="col-logo"> <Logo/> </Col>
                        <Col xs="7" className="col-search"> <Search/></Col>
                        <Col xs="3" className="col-authenitcation" style={{paddingTop: "3%"}}><Authentication/></Col>
                    </Row>
               </div>
           </div>
       );
    }
}

export default Header;