import React, { Component } from 'react';
import './Header.css'
import Logo from './Logo/Logo';
import Search from './Search/Search';
import Authentication from './Authentication/Authentication'
import { Row, Col } from 'reactstrap';


class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: ''
        }
    }
    changeBodyComponent = (value) => {
        console.log(value);
        alert(value);
    }
    
    render(){
       return (
           <div className="header">
               <div className="container">
                <Row>
                    <Col xs="2" className="col-logo"> 
                        <Logo/> 
                    </Col>
                    <Col xs="7" className="col-search"> 
                        <Search searchTrigger = { this.changeBodyComponent }/>
                    </Col>
                    <Col xs="3" className="col-authenitcation" style={{paddingTop: "3%"}}><Authentication/></Col>
                </Row>
               </div>
           </div>
       );
    }
}

export default Header;