import React, { Component } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { server } from "../server";
import "react-confirm-alert/src/react-confirm-alert.css";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";
import moment from 'moment';
import { Alert } from "../confirmalert";
import schedule from 'node-schedule';
import { Button } from 'reactstrap';
import "../confirmalert";

export const PlaylistContext = React.createContext();

export class PlaylistProvider extends Component {
  constructor() {
    super();
    this.state = {
      playlist: [],
      currentSong: { id: "" },
      playlistStart: false,
      returnToIndex: false,
      playlistEnd: true,
      serviceAvailable: true,
      topSongs: []
    };
    this.socket = null;
    this.serviceActivate = this.serviceActivate.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.clickToVote = this.clickToVote.bind(this);
    this.clickToAdd = this.clickToAdd.bind(this);
    this.playlistStart = this.playlistStart.bind(this);
    this.playlistEnd = this.playlistEnd.bind(this);
    this.voteForSong = this.voteForSong.bind(this);
  }

  componentDidMount() {
    this.getPlaylist();
    let unlockScheduled = new schedule.RecurrenceRule();
    if (moment().isBefore(moment('5:30:0', 'hh:mm:ss'))) {
      unlockScheduled.hour = 5;
      unlockScheduled.minute = 30;
      schedule.scheduleJob(unlockScheduled, this.serviceActivate(true));
    }
    else if(moment().isBefore(moment('17:30:0', 'hh:mm:ss')))
    {
      unlockScheduled.hour = 17;
      unlockScheduled.minute = 30;
      schedule.scheduleJob(unlockScheduled, this.serviceActivate(false));
    }
    else if(moment().isAfter(moment('17:30:0', 'hh:mm:ss')))
      this.serviceActivate(false);
    else
      this.serviceActivate(true);
  }

  componentWillMount() {
    this.socket = io(server);
    this.socket.on("connect", response => { });
    this.socket.on("play", response => {
      if (response !== null) {
        this.playlistStart(response);
        this.serviceActivate(false);
      }
    });
    this.socket.on("end", response => {
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

  serviceActivate(status) {
    this.setState({
      serviceAvailable: status
    })
  }

  clickToVote(id, isUpvote) {
    if (this.state.serviceAvailable) {
      const token = localStorage.getItem("Token");
      if (token === null) {
        Alert('Warning', 'Please log in to vote ', false);
      } else {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="custom-ui">
                <h1 className="title-confirm">Confirm</h1>
                <p className="message">You can only vote 5 times a day</p>
                <Button outline color="primary" onClick={() => {
                  this.voteForSong(id, isUpvote);
                  onClose();
                }}>Vote</Button>
                <Button outline color="primary" onClick={onClose} className="cancel">Cancel</Button>
              </div>
            );
          },
          closeOnClickOutside: true,
          closeOnEscape: true
        });
      }
    }
    else {
      Alert('Warning', 'Time for the playlist to play, you can not vote now.', false)
    }
  }

  voteForSong(id, isUpvote) {
    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("Token")).token
          }`
      },
      url: server + '/api/songs/vote',
      data: {
        video_id: id,
        isUpvote: isUpvote
      }
    })
      .then(response => {
        if (response.status === 200) {
          Alert('Message', 'Successfully Voted', true);
          this.getPlaylist();
        }
      })
      .catch(error => {
        Alert('Warning', 'You have used all your votes today, please comeback tomorrow', false);
      });
  }

  clickToAdd(videoId) {
    if (this.state.serviceAvailable) {
      const storage = localStorage.getItem("Token");
      if (storage === null) {
        Alert('Warning', 'Please login to add this song to the playlist', false);
      }
      else {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="custom-ui">
                <h1 className="title-confirm">Confirm</h1>
                <p className="message">You can only add one song a day</p>
                <Button outline color="primary" onClick={() => {
                  this.addToPlaylist(videoId);
                  onClose();
                }}>Add</Button>
                <Button outline color="primary" onClick={onClose} className="cancel">Cancel</Button>
              </div>
            );
          },
          closeOnClickOutside: true,
          closeOnEscape: true
        });
      }
    }
    else {
      Alert('Warning', 'Time for the playlist to play. \n You can not add this now.', false)
    }
  }

  addToPlaylist(videoId) {
    const storage = localStorage.getItem("Token");
    axios({
      method: 'POST',
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(storage).token
      },
      url: server + "/api/songs/add",
      data: {
        id: videoId
      }
    })
      .then(response => {
        Alert('Message', 'Successfully added', true);
        this.getPlaylist();
      })
      .catch(error => {
        Alert('Warning', 'This account has already added a song, try again tomorrow', false);
      });
  };

  getPlaylist() {

    axios
      .get(server + "/api/songs/playlist")
      .then(response => {
        if (response.data.message === 'There is no song in the play list now!')
          this.setState({
            playlist: []
          });
        else {
          this.setState({
            playlist: []
          });
          this.setState({
            playlist: response.data.message
          });
        }
      })
      .catch(error => {
        this.setState({
          playlist: []
        })
      });
  }

  playlistStart(response) {
    this.setState({
      currentSong: {
        id: response.videoId
      },
      topSongs: [this.state.playlist[0], this.state.playlist[1], this.state.playlist[2]],
      playlistStart: true
    });
  }

  async playlistEnd(response) {
    confirmAlert({
      title: "Playlist Ended",
      message: "Please Come Back Tomorrow",
      buttons: [
        {
          label: "OK"
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
    });
    localStorage.removeItem('SearchingHistory');
  }

  render() {
    const { currentSong, playlistStart, returnToIndex, serviceAvailable } = this.state;
    return (
      <div>
        <PlaylistContext.Provider
          value={{
            playlist: this.state.playlist,
            playlistStart: playlistStart,
            playlistEnd: this.state.playlistEnd,
            top1Song: this.state.top1Song,
            clickToAdd: this.clickToAdd,
            clickToVote: this.clickToVote,
            serviceAvailable: serviceAvailable
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
            state: { playlistStart: true }
          }} />}
      </div>
    );
  }
}
