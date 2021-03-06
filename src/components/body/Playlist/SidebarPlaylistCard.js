import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MdThumbUp } from "react-icons/md";
import { MdThumbDown } from "react-icons/md";
import { Row, Col } from "reactstrap";
import "./SidebarPlaylistCard.css";
import { PlaylistContext } from "../../../contexts/PlaylistContext";

export default class SidebarPlaylistCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: this.props.thumbnail,
      song_title: this.props.song_title,
      singer: this.props.singer,
      upvote: this.props.upvote,
      downvote: this.props.downvote,
      id: this.props.id,
      token: localStorage.token,
      votingID: this.props.votingID,
      addedUser: this.props.addedUser,
      available: true
    };
  }

  componentWillMount() {
    let now = new Date();
    if (now.getHours() === 17) {
      if (now.getMinutes() >= 29) {
        this.setState({
          available: false
        })
      }
    }
    else if (now.getHours() > 17)
      this.setState({
        available: false
      })
  }

  render() {
    const {
      thumbnail,
      song_title,
      singer,
      upvote,
      downvote,
      votingID,
      id,
      available,
      addedUser
    } = this.state;
    const MAX_LENGTH = 40;
    return (
      <Row className="sidebar-song">
        <Col xs="4" className="sidebar-song-img">
          {available &&
            <Link
              to={{
                pathname: "/playing/" + id,
                state: { title: song_title, singer: singer, status: true, addedUser: addedUser }
              }}
            >
                <img src={thumbnail} alt="Thumbnail" className="img-fluid" />
            </Link>}
          {!available && <img src={thumbnail} alt="Thumbnail" className="img-fluid" />}
        </Col>
        <Col xs="6" className="sidebar-song-info">
          {available &&
            <Link
              to={{
                pathname: "/playing/" + id,
                state: { title: song_title, singer: singer, status: true, addedUser: addedUser }
              }} style={{ textDecoration: "none" }}
            >
              <div className="sidebar-song-title">
                {song_title.length > MAX_LENGTH ? (
                  <div> {`${song_title.substring(0, MAX_LENGTH)}...`}</div>
                ) : (
                    <div>{song_title}</div>
                  )}
              </div>
              <div className="sidebar-song-singer">{singer}</div>
            </Link>}
          {!available &&
            <div className = "playlist-playing">
              <div className="sidebar-song-title" >
                {song_title.length > MAX_LENGTH ? (
                  <div> {`${song_title.substring(0, MAX_LENGTH)}...`}</div>
                ) : (
                    <div>{song_title}</div>
                  )}
              </div>
              <div className="sidebar-song-singer">{singer}</div>
            </div>}
        </Col>
        <PlaylistContext.Consumer>
          {({ clickToVote }) => (
            <Col xs="1" className="vote">
              <div className="up-vote">
                <MdThumbUp
                  className="like"
                  onClick={() => clickToVote(votingID, true)}
                />
                <div className="text-center">
                  <span className="num-vote">{upvote}</span>{" "}
                </div>
              </div>
              <div className="down-vote">
                <MdThumbDown
                  className="dislike"
                  onClick={() => clickToVote(votingID, false)}
                />
                <div className="text-center">
                  <span className="num-vote">{downvote}</span>{" "}
                </div>
              </div>
            </Col>
          )}
        </PlaylistContext.Consumer>
      </Row>
    );
  }
}
