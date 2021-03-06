import React, { Component } from "react";
import "./Header.css";
import Logo from "./Logo/Logo";
import Search from "./Search/Search";
import Authentication from "./Authentication/Authentication";
import { Row, Col } from "reactstrap";
// import CountdownClock from "../clock/CountdownClock";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }
  render() {
    return (
      <div className="header">
        <div className="container">
          <Row>
            <Col xs="3" className="col-logo">
              <Logo />
            </Col>
            <Col xs="6" className="col-search">
              <Search />
            </Col>
            <Col xs="3" className="col-authenitcation">
              <Authentication />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Header;
