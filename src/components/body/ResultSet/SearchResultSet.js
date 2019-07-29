import React, { Component } from "react";
import axios from "axios";
import SearchResultCard from "./SearchResultCard";
import { server } from "../../../server.js";
import { Button } from 'reactstrap';
export default class SearchResultSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      songList: [],
      videoFound: false,
      nextPage: ''
    };
    this.getSongList = this.getSongList.bind(this);
    this.loadResult = this.loadResult.bind(this);
    this.checkStorage = this.checkStorage.bind(this);
    this.storageUpdate = this.storageUpdate.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {
    this.loadResult(new URLSearchParams(this.props.location.search).get('q'));
  }

  componentDidUpdate(prevProps) {
    if (new URLSearchParams(prevProps.location.search).get('q') !== new URLSearchParams(this.props.location.search).get('q'))
      this.loadResult(new URLSearchParams(this.props.location.search).get('q'));
  }

  async loadResult(keyword) {
    if (keyword !== this.state.text) {
      //clear the current list in state
      if (this.state.songList.length !== 0) {
        await this.setState({
          songList: []
        });
      }
      //add new list to the state
      const storage = localStorage.getItem('SearchingHistory');
      let result = null;
      if (storage === null) {
        result = await this.getSongList(keyword);
        await this.setState({
          keyword: result.keyword,
          videoFound: result.videoFound,
          nextPage: result.nextPage,
          songList: result.songList
        })
      } else {
        let result = this.checkStorage(keyword, JSON.parse(storage));
        if (result !== null) {
          await this.setState({
            keyword: result.keyword,
            songList: result.songList,
            videoFound: true,
            nextPage: result.nextPage
          });
        } else {
          result = await this.getSongList(keyword);
          await this.setState({
            keyword: result.keyword,
            songList: result.songList,
            videoFound: result.videoFound,
            nextPage: result.nextPage
          });
        }
      }
    }
  }

  async getSongList(value) {
    let songList = [];
    let nextPage = '';
    let videoFound = false;
    await axios
      .get(server + `/api/songs/search/${value}`)
      .then((response) => {
        if (response.data.message !== "No video found") {
          songList = response.data.message.data;
          nextPage = response.data.message.nextPage;
          videoFound = true;
        }
        this.storageUpdate({ keyword: value, songList: songList, nextPage: nextPage });
      })
      .catch(error => {
        console.log(error);
        return {
          keyword: value,
          songList: songList,
          videoFound: videoFound,
          nextPage: nextPage
        }
      });
    return {
      keyword: value,
      songList: songList,
      videoFound: videoFound,
      nextPage: nextPage
    }
  }

  storageUpdate(object) {
    const storage = localStorage.getItem("SearchingHistory");
    let newArr = [];
    if (storage !== null) {
      newArr = JSON.parse(storage);
      if (newArr.length >= 10) newArr.shift();
    } 
    newArr.push(object);
    localStorage.setItem("SearchingHistory", JSON.stringify(newArr));
  }

  checkStorage(keyword, array) {
    for (let result of array) {
      if (result.keyword === keyword) {
        return result;
      }
    }
    return null;
  }

  showMore() {
    axios
      .get(
        server +
        `/api/songs/search/${this.state.text}?page=${this.state.nextPage}`
      )
      .then(response => {
        if (response.data.message === "No video found") {
          this.setState({ videoFound: false });
        } else {
          this.setState({
            songList: this.state.songList.concat(response.data.message.data),
            nextPage: response.data.message.nextPage
          });
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    const { keyword, videoFound, songList } = this.state;
    return (
      <div className="text-center">
        <div className="search-area-header">
          <span>
            Show results for <span className="search-input">{keyword}</span>
          </span>
        </div>
        <div className="result-set">
          {videoFound === 0 && <div>NO VIDEO FOUND</div>}
          {videoFound === true && (
            <div>
              {songList.map((value, key) => {
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
          onClick={this.showMore}
        >
          Show more
        </Button>
      </div>
    );
  }
}
