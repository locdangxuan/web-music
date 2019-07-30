import React, { Component } from "react";
import PlaylistCard from "./PlaylistCard";
import "./Playlist.css";
import { PlaylistContext } from "../../../contexts/PlaylistContext";
import playlistHeader from '../../Image/playlist-header.svg';
import playlistEndHeader from '../../Image/Playlist Ended.svg';

export default class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      playlist: [],
    };
  }

  render() {
    let please = ['P','L','E','A','S','E'];
    let comeback = ['C','O','M','E','B','A','C','K'];
    let tomorrow = ['T','O','M','O','R','R','O','W'];
    return (
      <div className="main-playlist">
        <PlaylistContext.Consumer>
          {({ playlistEnd }) => (
            <div className="playlist-header">
              {playlistEnd &&
                <img src={playlistHeader} alt="header" />}
              {!playlistEnd &&
                <div>
                  <img src = {playlistEndHeader} alt="end-header" key="1"></img>
                  <div className="popout">
                  {please.map((value) => { return <span>{value}</span> })}  
                  <span>&ensp;</span>
                  {comeback.map((value) => { return <span>{value}</span> })}
                  <br/>
                  {tomorrow.map((value) => { return <span>{value}</span> })}
                  </div>
                </div>
              }
            </div>
          )}
        </PlaylistContext.Consumer>
        <PlaylistContext.Consumer>
          {({ playlist }) =>
            playlist.map((value, index) => {
              return (
                <PlaylistCard
                  id={value.videoId}
                  songTitle={value.title}
                  singer={value.channelTitle}
                  addedUser={value.addedUser}
                  thumbnail={value.thumbnails}
                  upvote={value.upvote}
                  downvote={value.downvote}
                  key={index}
                  duration={value.duration}
                  votingID={value._id}
                  rank={++index}
                />
              );
            })
          }
        </PlaylistContext.Consumer>
      </div>
    );
  }
}
