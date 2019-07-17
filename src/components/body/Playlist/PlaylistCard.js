import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MdThumbUp } from "react-icons/md";
import { MdThumbDown } from "react-icons/md";
import "./PlaylistCard.css";
import { PlaylistContext } from "../../../contexts/PlaylistContext";

export default class PlaylistCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: this.props.thumbnail,
      song_title: this.props.song_title,
      singer: this.props.singer,
      adder: this.props.adder,
      upvote: this.props.upvote,
      downvote: this.props.downvote,
      id: this.props.id,
      token: localStorage.token,
      votingID: this.props.votingID
    };
  }

  render() {
    const {
      thumbnail,
      singer,
      song_title,
      adder,
      upvote,
      downvote,
      id,
      votingID
    } = this.state;
    return (
      <div className="playlist-card">
        <Link
          to={{
            pathname: "/playing/" + id,
            state: { title: song_title, singer: singer }
          }}
        >
          <div className="thumbnail">
            <img src={thumbnail} alt="#" width={100} />
          </div>
        </Link>

        <Link
          to={{
            pathname: "/playing/" + id,
            state: { title: song_title, singer: singer }
          }}
          className="info"
        >
          <div>
            <div className="song-title">{song_title}</div>
            <div className="singer">{singer}</div>
          </div>
        </Link>

        <div className="user-relation">
          <div className="adder">{adder}</div>
          <PlaylistContext.Consumer>
            {({ clickToVote }) => (
              <div className="sidebar-vote">
                <div className="upvote">
                  <MdThumbUp
                    onClick={() => clickToVote(votingID, true)}
                    className="like"
                  />
                  <span className="amount">{upvote}</span>
                </div>
                <div className="downvote">
                  <MdThumbDown
                    onClick={() => clickToVote(votingID, false)}
                    className="dislike"
                  />
                  <span className="amount">{downvote}</span>
                </div>
              </div>
            )}
          </PlaylistContext.Consumer>
        </div>
      </div>
    );
  }
}
