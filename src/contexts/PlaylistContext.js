import React, { Component } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { server } from "../server";
import "react-confirm-alert/src/react-confirm-alert.css";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";

export const PlaylistContext = React.createContext();

export class PlaylistProvider extends Component {
  constructor() {
    super();
    this.state = {
      playlist: [],
      currentSong: { id: "", duration: "" },
      playlistStart: false,
      returnToIndex: false
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
    })
  }

  componentDidUpdate() {
    // this.socket = io(gorgeous_server);
    // this.socket.on('connect', (response) => { 
    //     this.setState({ connection: response });
    //     console.log(response);
    // });
    // this.socket.on('play', (response) => { 
    //     this.playlistStart(response);

    // });
    // this.socket.on('end', (response) => {
    //     this.playlistEnd(response);
    // })
  }

  clickToVote(Id, isUpvote) {
    const token = localStorage.getItem("Token");
    if (token === null) {
      alert("Please log in to vote ");
    } else {
      axios({
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("Token")).token
          }`
        },
        url: server + "/api/songs/vote",
        data: {
          video_id: Id,
          isUpvote: isUpvote
        }
      })
        .then(response => {
          console.log(response.status);
          if (response.status === 400)
            alert(
              "You have used all your votes today, please comeback tomorrow"
            );
          else if (response.status === 200) {
            alert("Successfully Voted !!!");
            this.getPlaylist();
          }
        })
        .catch(error => {
          alert("Voted Fail !!! Please try again later");
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
          onClick: function() {
            const token = localStorage.getItem("Token");
            if (token === null) {
              alert("Please login to add this song to the playlist");
            } else {
              console.log(JSON.parse(localStorage.getItem("Token")).token);
              console.log(videoId);
              axios({
                method: "POST",
                headers: {
                  Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("Token")).token
                },
                url: server + "/api/songs/add",
                data: {
                  id: videoId
                }
              })
                .then(response => {
                  console.log(response);
                  if (response.status === 200) alert("Successfully added");
                  this.getPlaylist();
                })
                .catch(error => {
                  alert(
                    "This account has already added a song, try again tomorrow!!"
                  );
                  console.log(error);
                });
            }
          }
        },
        {
          label: "Cancel",
          onClick: function() {
            alert("Song was not added");
          }
        }
      ]
    });
  }

  addToPlaylist(videoId) {
    axios({
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("Token")).token
      },
      url: server + "/songs/add",
      data: {
        id: videoId
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 200)
          alert("This account has already added a song, try again tomorrow!!");
        else {
          alert("Successfully added");
          this.getPlaylist();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  getPlaylist() {
    this.setState({
      playlist: []
    });
    axios
      .get(server + `/api/songs/playlist`)
      .then(response => {
        this.setState({
          playlist: response.data
        });
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }

  getNewSong() {

  }

  async playlistStart(response) {
    console.log(response);
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
    console.log(passingTime);
    await this.setState({
      currentSong: {
        id: response.videoId,
        passingTime: passingTime,
        title: result.title,
        singer: result.singer
      },
      playlistStart: true
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

    })
    this.setState({
      currentSong: {},
      playlistStart: false,
      returnToIndex: true
    })
  }

  render() {
    const { currentSong, playlistStart, returnToIndex } = this.state;
    return (
      <div>
        <PlaylistContext.Provider
          value={{
            playlist: this.state.playlist,
            returnToIndex: true,
            clickToAdd: this.clickToAdd,
            clickToVote: this.clickToVote
          }}
        >
          {this.props.children}
        </PlaylistContext.Provider>
        {playlistStart &&
          <Redirect to={{
            pathname: `/playing/${currentSong.id}`,
            state: { title: currentSong.title, singer: currentSong.singer, passingTime: currentSong.passingTime }
          }}>
          </Redirect>}
        {returnToIndex &&
          <Redirect to = {'/'}/>
        }
      </div>
    );
  }
}
