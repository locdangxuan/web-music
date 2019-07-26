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
      songTitle: this.props.songTitle,
      singer: this.props.singer,
      addedUser: this.props.addedUser,
      upvote: this.props.upvote,
      downvote: this.props.downvote,
      id: this.props.id,
      token: localStorage.token,
      songID: this.props.votingID
    };
  }

  render() {
    const {
      thumbnail,
      singer,
      songTitle,
      addedUser,
      upvote,
      downvote,
      id,
      songID
    } = this.state;
    return (
      <div className='playlist-card'>
        <Link
          to={{
            pathname: "/playing/" + id,
            state: { title: songTitle, singer: singer, status: true, addedUser: addedUser }
          }}
        >
          <div className="thumbnail">
            <img src={thumbnail} alt="Thumbnail" width={100} />
          </div>
        </Link>
        <Link
          to={{
            pathname: '/playing/' + id,
            state: { title: songTitle, singer: singer, status: true, addedUser: addedUser }
          }}
          className="info"
        >
          <div>
            <div className="song-title">{songTitle}</div>
            <div className="singer">{singer}</div>
          </div>
        </Link>
        <div className="user-relation">
          <div className="adder">{addedUser}</div>
          <PlaylistContext.Consumer>
            {({ clickToVote }) => (
              <div className="sidebar-vote">
                <div className="upvote">
                  <MdThumbUp
                    onClick={() => clickToVote(songID, true)}
                    className="like"
                  />
                  <span className="amount">{upvote}</span>
                </div>
                <div className="downvote">
                  <MdThumbDown
                    onClick={() => clickToVote(songID, false)}
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
