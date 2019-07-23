import React, { Component } from "react";
import "./VideoSong.css";
import { Button } from "reactstrap";
import Iframe from "react-iframe";
import { PlaylistContext } from "../../../contexts/PlaylistContext";
import { server } from '../../../server';
import io from "socket.io-client";


export default class VideoSong extends Component {
  constructor(props) {
    super(props);
    let startAt = 0;
    let autoplay = 0;
    let control = 1;
    let iframeid = 'normal';
    this.socket = null;
    this.state = {
      id: '',
      singer: '',
      title: '',
      startAt: startAt,
      autoplay: autoplay,
      control: control,
      iframeId: iframeid
    };
  }

  componentWillMount() {
    console.log(this.props.location.state);
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.fromPlaylist === true) {
        this.socket = io(server);
        this.socket.on('play', (response) => {
          if (response !== null) {
            console.log(response);
            this.playFromPlaylist(response);
          }
        });
        this.socket.on('end', (response) => {
          window.location.assign('localhost:3000');
        });
      }
      else {
        this.setState({
          id: this.props.match.params.id,
          singer: this.props.location.state.singer,
          title: this.props.location.state.title,
          startAt: 0,
          autoplay: 0,
          control: 1,
          iframeId: 'normal'
        })
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
      autoplay: 1,
      control: 0,
      iframeId: 'playlist-start'
    })
    window.location.assign('localhost:3000');
  }

  componentDidUpdate = () => {
    if (this.state.id !== this.props.match.params.id) {
      this.setState({
        id: this.props.match.params.id,
        singer: this.props.location.state.singer,
        title: this.props.location.state.title,
        startAt: this.props.location.state.start
      });
    }
  };

  render() {
    const { id, singer, title, startAt, autoplay, control, iframeId, status } = this.state;
    return (
      <div className="video-song">
        <div className="video text-center">
          <Iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=${autoplay}&start=${startAt}&controls=${control}`}
            height="450px"
            id={iframeId}
            className="embed-responsive embed-responsive-4by3"
            display="initial"
            position="relative"
          />
        </div>
        <div className="song-video-name">
          <div className="add-song">
            {!status &&
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
              </PlaylistContext.Consumer>}
          </div>
        </div>
        <div className="detail">
          <p style={{ fontSize: "22px" }}>{title}</p>
          <p>{singer}</p>
        </div>
      </div>
    );
  }
}
