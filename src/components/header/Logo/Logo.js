import React, { Component } from "react";
import logo from "../../Image/ces.png";
import "./Logo.css";
import { Link } from "react-router-dom";
import { PlaylistContext } from "../../../contexts/PlaylistContext";
class Logo extends Component {
  render() {
    return (
      <PlaylistContext.Consumer>
        {({ playlistStart }) => (
          <div className="logo-background img-fluid">
            {!playlistStart &&
              <Link to={"/"}>
                <img src={logo} alt="logo" className="logo-header" />
              </Link>}
            {playlistStart &&
              <img src={logo} alt="logo" className="logo-header" />}
          </div>)}
      </PlaylistContext.Consumer>
    );
  }
}
export default Logo;
