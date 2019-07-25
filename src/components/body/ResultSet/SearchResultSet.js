import React, { Component } from "react";
import axios from "axios";
import SearchResultCard from "./SearchResultCard";
import { server } from "../../../server.js";
import { Button } from 'reactstrap';
export default class SearchResultSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      SongList: [],
      videoFound: false
    };

    this._isMounted = false;
    this.getSongList = this.getSongList.bind(this);
    this.loadResult = this.loadResult.bind(this);
    this.check = this.check.bind(this);
    this.storageUpdate = this.storageUpdate.bind(this);
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let song = params.get('q');
    this.loadResult(song);
  }

  componentDidUpdate() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let song = params.get('q');
    //Clear the list in the state
    if (this.state.text !== song) {
      this.setState({
        SongList: []
      });
      //Get new list after the list is cleared
      if (this.state.SongList.length === 0)
        this.loadResult(song);
    }
  }

  async loadResult(keyword) {
    const storage = localStorage.getItem('SearchingHistory');
    if (storage === null) {
      this.getSongList(keyword);
    } else {
      let result = this.check(keyword, JSON.parse(storage));
      if (result === null) {
        this.getSongList(keyword);
      } else {
        await this.setState({
          text: keyword,
          SongList: result.songList,
          videoFound: true
        });
      }
    }
  }

  storageUpdate(object) {
    const storage = localStorage.getItem("SearchingHistory");
    let newArr = [];
    if (storage !== null) {
      newArr = JSON.parse(storage);
      if (newArr.length >= 6) newArr.shift();
    }
    newArr.push(object);
    localStorage.setItem("SearchingHistory", JSON.stringify(newArr));
  }

  check(keyword, array) {
    for (let result of array) {
      if (result.keyword === keyword) {
        return result;
      }
    }
    return null;
  }

  getSongList(value) {
    axios
      .get(server + `/api/songs/search/${value}`)
      .then(async (response) => {
        if (response.data === "No Video Found") {
          this.setState({ videoFound: false });
        } else {
          await this.setState({
            text: value,
            SongList: response.data.data,
            videoFound: true,
            nextPage: response.data.nextPage
          });
          this.storageUpdate({ keyword: value, songList: response.data.data });
        }
      })
      .catch(error => console.log(error));
  }

  async showMore() {
    await axios
      .get(
        server +
        `/api/songs/search/${this.state.text}?page=${this.state.nextPage}`
      )
      .then(response => {
        if (response.data === "No Video Found") {
          this.setState({ videoFound: false });
        } else {
          this.setState({
            SongList: this.state.SongList.concat(response.data.data),
            nextPage: response.data.nextPage
          });
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    const { text, videoFound } = this.state;
    const SongList = this.state.SongList;
    return (
      <div className="text-center">
        <div className="search-area-header">
          <span>
            Show results for <span className="search-input">{text}</span>
          </span>
        </div>
        <div className="result-set">
          {videoFound === false && <div>NO VIDEO FOUND</div>}
          {videoFound === true && (
            <div>
              {SongList.map((value, key) => {
                return (
                  <SearchResultCard
                    videoId={value.videoId}
                    songTitle={value.title}
                    singer={value.channelTitle}
                    imgsrc={value.thumbnails}
                    key={key}
                  />
                );
              })}
            </div>
          )}
        </div>{" "}
        <Button outline color="primary" className="show-more-button"
          onClick={() => {
            this.showMore();
          }}
        >
          Show more
        </Button>
      </div>
    );
  }
}
