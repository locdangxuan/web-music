import React, { Component } from 'react';
import './Header.css'
import Logo from './header/Logo';
import Search from './header/Search';
import Info from './header/Info'
import { Row, Col } from 'reactstrap';


class Header extends Component{
    render(){
       return (
           <div className = "header">
               <div className="container">
                <Row>
                        <Col xs="2" className = "col-logo"> <Logo/> </Col>
                        <Col xs="auto" className = "col-search"> <Search/></Col>
                        <Col xs="3" className = "col-info"><Info /></Col>
                    </Row>
               </div>
           </div>
       );
    }
}

export default Header;