import React, { Component } from "react";
import SidebarPlaylistCard from "./SidebarPlaylistCard";
import "./SidebarPlaylist.css";
import { PlaylistContext } from "../../../contexts/PlaylistContext";
import heading from '../../Image/Playlist.svg';


export default class SidebarPlaylist extends Component {
  render() {
    return (
      <div className="sidebar-playlist">
        <div className = "heading">
            <img src = {heading} alt = "PLAYLIST" width = {300}/>
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
                />
              );
            })
          }
        </PlaylistContext.Consumer>
      </div>
    );
  }
}
