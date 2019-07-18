import React, { Component } from "react";
import "./VideoSong.css";
import { Button } from "reactstrap";
import Iframe from "react-iframe";
import { PlaylistContext } from "../../../contexts/PlaylistContext";
import { Redirect } from 'react-router-dom';


export default class VideoSong extends Component {
  constructor(props) {
    super(props);
    let startAt = 0;
    let autoplay = 0;
    let control = 1;
    let iframeid = 'normal';
    this.state = {
      id: '',
      singer: '',
      title: '',
      startAt: startAt,
      autoplay: autoplay,
      control: control,
      iframeId: iframeid
    }
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.passingTime !== undefined) {
        startAt = this.props.location.state.passingTime;
        autoplay = 1;
        control = 0;
        iframeid = 'playlist-start';
      }
      this.state = {
        id: this.props.match.params.id,
        singer: this.props.location.state.singer,
        title: this.props.location.state.title,
        startAt: startAt,
        autoplay: autoplay,
        control: control,
        iframeId: iframeid
      };
    }
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
    const { id, singer, title, startAt, autoplay, control, iframeId } = this.state;
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
          <PlaylistContext.Consumer>
            {({ clickToAdd }) => (
              <div className="add-song">
                <Button
                  outline
                  color="primary"
                  className="btnAdd"
                  onClick={() => clickToAdd(id)}
                >
                  Add
                </Button>
              </div>
            )}
          </PlaylistContext.Consumer>
        </div>
        <div className="detail">
          <p style={{ fontSize: "22px" }}>{title}</p>
          <p>{singer}</p>
        </div>
      </div>
    );
  }
}
