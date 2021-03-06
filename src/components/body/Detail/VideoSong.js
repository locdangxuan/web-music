import React, { Component } from "react";
import "./VideoSong.css";
import { Button } from "reactstrap";
import Iframe from "react-iframe";
import { PlaylistContext } from "../../../contexts/PlaylistContext";
import { server } from "../../../server";
import io from "socket.io-client";
import { Animated } from "react-animated-css";
import { Redirect } from "react-router-dom";

export default class VideoSong extends Component {
  constructor(props) {
    super(props);
    let startAt = 0;
    let autoplay = 0;
    let control = 1;
    let iframeid = "normal";
    this.socket = null;
    this.state = {
      id: "",
      singer: "",
      title: "",
      startAt: startAt,
      autoplay: autoplay,
      control: control,
      iframeId: iframeid,
      returnToIndex: false
    };
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.playlistStart === true) {
        this.socket = io(server);
        this.socket.on("play", response => {
          if (response !== null) {
            this.playFromPlaylist(response);
          }
        });
        this.socket.on("end", response => {
          window.location.assign(window.location.hostname);
          this.setState({ returnToIndex: true });
        });
      } else {
        this.setState({
          id: this.props.match.params.songId,
          singer: this.props.location.state.singer,
          title: this.props.location.state.title,
          status: this.props.location.state.status,
          addedUser: this.props.location.state.addedUser,
          startAt: 0,
          autoplay: 0,
          control: 1,
          iframeId: "normal"
        });
      }
    }
  }

  async playFromPlaylist(data) {
    let now = new Date();
    let startAt =
      (now.getHours() - data.startAt.hour) * 3600 +
      (now.getMinutes() - data.startAt.minute) * 60 +
      (now.getSeconds() - data.startAt.second);
    await this.setState({
      id: data.videoId,
      singer: data.channelTitle,
      title: data.title,
      status: data.status,
      startAt: startAt,
      addedUser: data.addedUser,
      autoplay: 1,
      control: 0,
      iframeId: "playlist-start"
    });
  }

  componentDidUpdate = () => {
    if (this.state.id !== this.props.match.params.songId) {
      this.setState({
        id: this.props.match.params.songId,
        singer: this.props.location.state.singer,
        title: this.props.location.state.title,
        startAt: this.props.location.state.start,
        status: this.props.location.state.status,
        addedUser: this.props.location.state.addedUser
      });
    }
  };

  render() {
    const {
      id,
      singer,
      title,
      startAt,
      autoplay,
      control,
      iframeId,
      returnToIndex,
      addedUser
    } = this.state;
    let url = `https://www.youtube.com/embed/${id}?autoplay=${autoplay}&start=${startAt}&controls=${control}`;
    return (
      <Animated
        animationIn="fadeInLeft"
        animationOut="fadeOutDown"
        isVisible={true}
      >
        <div className="video-song">
          <div className="video text-center">
            <Iframe
              src={url}
              height="450px"
              id={iframeId}
              className="embed-responsive embed-responsive-4by3"
              display="initial"
              position="relative"
            />
          </div>
          <div className="song-video-name">
            <div className="add-song">
              <PlaylistContext.Consumer>
                {({ clickToAdd }) => (
                  <Button
                    outline
                    color="primary"
                    className="btnAdd"
                    onClick={() => clickToAdd(id)}
                  >
                    Add
                  </Button>
                )}
              </PlaylistContext.Consumer>
            </div>
          </div>
          <div className="detail">
            <p className="title">{title}</p>
            <div>
              <p>
                {singer}{!(addedUser === ''||addedUser === undefined) && <span> - added by{" "}<strong className="addedUser">{addedUser}</strong></span>
                }
              </p>
            </div>
          </div>
          {returnToIndex && <Redirect to={'/'}></Redirect>}
        </div>
      </Animated>
    );
  }
}
