import React, { Component } from "react";
import "./SearchResultCard.css";
import { Button, Row, Col } from "reactstrap";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { PlaylistContext } from "../../../contexts/PlaylistContext";

export default class InfoSongSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsrc: this.props.imgsrc,
      song_title: this.props.song_title,
      singer: this.props.singer,
      id: this.props.id,
      
    };
  }

  render() {
    const { song_title, singer, id, imgsrc } = this.state;
    return (
      <Row className="music-card">
        <Col xs="3" className="picture">
          <img src={imgsrc} alt="#" className="img-fluid" />
        </Col>
        <Col xs="7" className="info">
          <div className="song-title">
            <Link
              to={{
                pathname: "/playing/" + id,
                state: { title: song_title, singer: singer, status: false }
              }}
            >
              {song_title}
            </Link>
          </div>
          <div className="singer">{singer}</div>
        </Col>
        <Col xs="2" className="button-add">
          <PlaylistContext.Consumer>
            {({ clickToAdd }) => (
              <Button
                outline
                color="primary"
                className="addBtn"
                onClick={() => clickToAdd(id)}
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
