import React, { Component } from "react";
import logo from "../../Image/ces.png";
import "./Logo.css";
import { Link } from "react-router-dom";
class Logo extends Component {
  render() {
    return (
      <div className="logo-background img-fluid">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="logo-header" />
        </Link>
      </div>
    );
  }
}
export default Logo;
