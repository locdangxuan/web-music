import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
// import logo from "../Image/CodeEngine.png";
import "./FooterDetail.css"

export default class FooterDetail extends Component {
  render() {
    return (
      <div id="footer-detail">
        <Container className="content-detail">
          <Row>
            <Col md="4">
              <h4>NEW BUSINESS INQUIRES</h4>
              <p>newbusiness@codeenginestudio.com</p>
            </Col>
            <Col md="4">
              <h4>GENERAL INFO</h4>
              <p>info@codeenginestudio.com</p>
              <p>+1-516-900-4080</p>
            </Col>
            <Col md="4">
              <h4>NEW BUSINESS INQUIRES</h4>
              <p>newbusiness@codeenginestudio.com</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
