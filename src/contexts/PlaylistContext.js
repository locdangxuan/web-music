import React, { Component } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { server } from "../server";
import "react-confirm-alert/src/react-confirm-alert.css";
export const PlaylistContext = React.createContext();

export class PlaylistProvider extends Component {
  constructor() {
    super();
    this.state = {
      playlist: []
    };
    this.getPlaylist = this.getPlaylist.bind(this);
    this.clickToVote = this.clickToVote.bind(this);
    this.clickToAdd = this.clickToAdd.bind(this);
  }

  componentWillMount() {
    this.getPlaylist();
  }

  clickToVote(Id, isUpvote) {
    const token = localStorage.getItem("Token");
    if (token === null) {
      alert("Please log in to vote ");
    } else {
      axios({
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("Token")).token
        },
        url: server + "/songs/vote",
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
          onClick: () => {
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
                url: server + "/songs/add",
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
          label: "Cancel"
        }
      ]
    });
  }

  getPlaylist() {
    this.setState({
      playlist: []
    });
    axios
      .get(server + `/songs/playlist`)
      .then(response => {
        this.setState({
          playlist: response.data
        });
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <PlaylistContext.Provider
        value={{
          playlist: this.state.playlist,
          clickToAdd: this.clickToAdd,
          clickToVote: this.clickToVote
        }}
      >
        {this.props.children}
      </PlaylistContext.Provider>
    );
  }
}
