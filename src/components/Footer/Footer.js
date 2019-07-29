import React, { Component } from "react";
import "./Footer.css";
import { Container, Row, Col } from "reactstrap";
import logo from "../Image/CodeEngine.png";

export default class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <section className="section">
          <div className="full-background" />
          <Container className="content">
            <Row>
              <Col md="4">
                <h3>NEW BUSINESS INQUIRES</h3>
                <p>newbusiness@codeenginestudio.com</p>
              </Col>
              <Col md="4">
                <h3>GENERAL INFO</h3>
                <p>info@codeenginestudio.com</p>
                <p>+1-516-900-4080</p>
              </Col>
              <Col md="4">
                <h3>NEW BUSINESS INQUIRES</h3>
                <p>newbusiness@codeenginestudio.com</p>
              </Col>
            </Row>
          </Container>
          <div className="text-center logo-footer">
            <img src={logo} alt="logo" />
          </div>
        </section>
      </div>
    );
  }
}
