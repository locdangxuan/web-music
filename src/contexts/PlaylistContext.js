import React, { Component } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { server } from "../server";
import "react-confirm-alert/src/react-confirm-alert.css";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";

import { Alert } from '../confirmalert';

export const PlaylistContext = React.createContext();

export class PlaylistProvider extends Component {
  constructor() {
    super();
    this.state = {
      playlist: [],
      currentSong: { id: "", duration: "" },
      playlistStart: false,
      returnToIndex: false,
      playlistEnd: true
    };
    this.socket = null;
    this.getPlaylist = this.getPlaylist.bind(this);
    this.clickToVote = this.clickToVote.bind(this);
    this.clickToAdd = this.clickToAdd.bind(this);
    this.playlistStart = this.playlistStart.bind(this);
    this.playlistEnd = this.playlistEnd.bind(this);
  }

  componentWillMount() {
    this.getPlaylist();
  }
  componentDidMount() {
    this.socket = io(server);
    this.socket.on('connect', (response) => {
    });
    this.socket.on('play', (response) => {
      if (response !== null) {
        this.playlistStart(response);
      }
    });
    this.socket.on('end', (response) => {
      if (response !== null) {
        this.playlistEnd(response);
      }
    });
    this.socket.on('playlist', (response) => {
      if (response !== null) {
        this.getPlaylist();
      }
    })
  }

  clickToVote(Id, isUpvote) {
    const token = localStorage.getItem("Token");
    if (token === null) {
      Alert('Warning', 'Please log in to vote ');
    } else {
      axios({
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("Token")).token
            }`
        },
        url: server + '/api/songs/vote',
        data: {
          video_id: Id,
          isUpvote: isUpvote
        }
      })
        .then(response => {
          if (response.status === 400)
            Alert('Warning', 'You have used all your votes today, please comeback tomorrow');
          else if (response.status === 200) {
            Alert('Message', 'Successfully Voted');
            this.getPlaylist();
          }
        })
        .catch(error => {
          Alert('Error', 'Voted Fail !!! Please try again later');
          console.log(error);
        });
    }
  }

  clickToAdd(videoId) {
    confirmAlert({
      title: "Confirm To Add!!!",
      message: "You can only add one song a day",
      buttons: [
        {
          label: "Add",
          onClick: () => this.addToPlaylist(videoId)
        },
        {
          label: "Cancel",
          onClick: function () {
            Alert('Warning', 'Song was not added');
          }
        }
      ]
    });
  }

  addToPlaylist(videoId) {
    const storage = localStorage.getItem("Token");
    if (storage === null) {
      Alert('Warning', 'Please login to add this song to the playlist');
    } else {
      axios({
        method: 'POST',
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(storage).token
        },
        url: server + '/api/songs/add',
        data: {
          id: videoId
        }
      })
        .then(response => {
          Alert('Message', 'Successfully added');
          this.getPlaylist();
        })
        .catch(error => {
          Alert('Warning', 'This account has already added a song, try again tomorrow!!');
        });
    }

  }

  getPlaylist() {
    this.setState({
      playlist: []
    })
    axios
      .get(server + '/api/songs/playlist')
      .then(response => {
        this.setState({
          playlist: response.data,
          topSongs: [response.data[0], response.data[1], response.data[2]]
        });
      })
      .catch(error => console.log(error));
  }

  async playlistStart(response) {
    let now = new Date();
    let result = {};
    for (let song of this.state.playlist) {
      if (song.id === response.videoId)
        result = song;
    }
    let passingTime =
      (now.getHours() - response.startAt.hour) * 3600 +
      (now.getMinutes() - response.startAt.minute) * 60 +
      (now.getSeconds() - response.startAt.second);
    await this.setState({
      currentSong: {
        id: response.videoId,
        passingTime: passingTime,
        title: result.title,
        singer: result.singer
      },
      playlistStart: true,
      playlistEnd: false
    });
  }

  async playlistEnd(response) {
    confirmAlert({
      title: 'Playlist Ended !!!',
      message: 'Please Come Back Tomorrow',
      buttons: [
        {
          label: 'OK',
        }
      ],
      closeOnClickOutside: true,
      closeOnEscape: true
    });
    this.setState({
      currentSong: {},
      playlistStart: false,
      playlistEnd: true,
      returnToIndex: true,
      playlist: []
      // playlist: [
      //   this.state.playlist[0],
      //   this.state.playlist[1],
      //   this.state.playlist[2]
      // ]
    });
    localStorage.removeItem('SearchingHistory');
  }

  render() {
    const { currentSong, playlistStart, returnToIndex } = this.state;
    return (
      <div>
        <PlaylistContext.Provider
          value={{
            playlist: this.state.playlist,
            playlistEnd: this.state.playlistEnd,
            top1Song: this.state.top1Song,
            clickToAdd: this.clickToAdd,
            clickToVote: this.clickToVote
          }}
        >
          {this.props.children}
        </PlaylistContext.Provider>
        {returnToIndex &&
          <Redirect to={'/'} />
        }
        {playlistStart &&
          <Redirect to={{
            pathname: `/playing/${currentSong.id}`,
            state: { title: currentSong.title, singer: currentSong.singer, passingTime: currentSong.passingTime }
          }} />}

      </div>
    );
  }
}
