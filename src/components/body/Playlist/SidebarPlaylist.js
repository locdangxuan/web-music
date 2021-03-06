import React, { Component } from "react";
import SidebarPlaylistCard from "./SidebarPlaylistCard";
import "./SidebarPlaylist.css";
import { PlaylistContext } from "../../../contexts/PlaylistContext";
import heading from "../../Image/Leaderboard.svg";
import { Animated } from "react-animated-css";

export default class SidebarPlaylist extends Component {
  constructor() {
    super();
    this.state = {
      rank: 1
    };
  }
  render() {
    return (
      <Animated
        animationIn="fadeInRight"
        animationOut="fadeOutDown"
        isVisible={true}
      >
        <div className="sidebar-playlist">
          <div className="heading">
            <img src={heading} alt="PLAYLIST" width={300} />
          </div>
          <PlaylistContext.Consumer>
            {({ playlist }) =>
              playlist.map((value, index) => {
                return (
                  <SidebarPlaylistCard
                    id={value.videoId}
                    song_title={value.title}
                    singer={value.channelTitle}
                    thumbnail={value.thumbnails}
                    upvote={value.upvote}
                    downvote={value.downvote}
                    key={index}
                    duration={value.duration}
                    votingID={value._id}
                    addedUser={value.addedUser}
                  />
                );
              })
            }
          </PlaylistContext.Consumer>
        </div>
      </Animated>
    );
  }
}
