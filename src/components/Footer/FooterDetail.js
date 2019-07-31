import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./FooterDetail.css";

export default class FooterDetail extends Component {
  render() {
    return (
      <div id="footer-detail">
        <Container className="content-detail">
          <Row>
            <Col md="6">All rights reserved </Col>
            <Col md="6" className="text-right">
              Licences belong to Youtube
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
