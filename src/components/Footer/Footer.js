import React, { Component } from "react";
import "./Footer.css";
import { Container, Row, Col } from "reactstrap";
import logo from "../Image/CodeEngine.png";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <div className="footer-img">
          <section className="section">
            <div className="full-background" />
            <div className="text-center logo-footer">
              <img src={logo} alt="logo" className="logo-img" />
            </div>
          </section>
        </div>
        <div className="footer-title">
          <Container>
            <Row>
              <Col md="6">All rights reserved </Col>
              <Col md="6" className="text-right">Licences belong to Youtube</Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
