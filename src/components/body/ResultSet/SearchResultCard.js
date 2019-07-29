import React, { Component } from "react";
import "./SearchResultCard.css";
import { Button, Row, Col } from "reactstrap";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { PlaylistContext } from "../../../contexts/PlaylistContext";

export default class SearchResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: this.props.imgsrc,
      songTitle: this.props.songTitle,
      singer: this.props.singer,
      videoId: this.props.videoId,
    };
  }

  render() {
    const { songTitle, singer, videoId, imgSrc } = this.state;
    return (
      <Row className="music-card">
        <Col xs="3" className="picture">
          <img src={imgSrc} alt="#" className="img-fluid" />
        </Col>
        <Col xs="7" className="info">
          <div className="song-title">
            <Link
              to={{
                pathname: "/playing/" + videoId,
                state: { title: songTitle, singer: singer, status: false }
              }}
            >
              {songTitle}
            </Link>
          </div>
          <div className="singer">{singer}</div>
        </Col>
        <Col xs="2" className="add-button">
          <PlaylistContext.Consumer>
            {({ clickToAdd }) => (
              <Button
                outline
                color="primary"
                onClick={() => clickToAdd(videoId)}
              >
                Add
              </Button>
            )}
          </PlaylistContext.Consumer>
        </Col>
      </Row>
    );
  }
}
