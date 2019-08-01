import React, { Component } from "react";
import axios from "axios";
import SearchResultCard from "./SearchResultCard";
import { server } from "../../../server.js";
import { Button } from "reactstrap";
import "./SearchResultSet.css";
import { Animated } from "react-animated-css";

export default class SearchResultSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      songList: [],
      nextPage: "",
      status: true
    };
    this.getSongList = this.getSongList.bind(this);
    this.loadResult = this.loadResult.bind(this);
    this.checkStorage = this.checkStorage.bind(this);
    this.storageUpdate = this.storageUpdate.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {
    let currentKeyWord = new URLSearchParams(this.props.location.search).get("q");
    this.loadResult(currentKeyWord);
  }

  componentDidUpdate(prevProps) {
    let previousKeyWord = new URLSearchParams(prevProps.location.search).get("q");
    let currentKeyWord = new URLSearchParams(this.props.location.search).get("q");
    if (previousKeyWord !== currentKeyWord)
      this.loadResult(currentKeyWord);
  }

  async loadResult(keyword) {
    if (keyword !== this.state.text) {
      //clear the current list in state
      if (this.state.songList.length !== 0) {
        this.setState({
          songList: []
        });
      }
      //add new list to the state
      const storage = localStorage.getItem("SearchingHistory");
      let result = null;
      if (storage === null) {
        result = await this.getSongList(keyword);
        this.setState({
          keyword: result.keyword,
          nextPage: result.nextPage,
          songList: result.songList,
          status: result.status
        });
      } else {
        let result = this.checkStorage(keyword, JSON.parse(storage));
        if (result !== null) {
          this.setState({
            keyword: result.keyword,
            songList: result.songList,
            nextPage: result.nextPage,
            status: (result.songList.length === 0) ? false : true
          });
        } else {
          result = await this.getSongList(keyword);
          this.setState({
            keyword: result.keyword,
            songList: result.songList,
            nextPage: result.nextPage,
            status: result.status
          });
        }
      }
    }
  }

  async getSongList(value) {
    let songList = [];
    let nextPage = "";
    let status = false;
    await axios
      .get(server + `/api/songs/search/${value}`)
      .then(response => {
        if (response.data.message !== "No video found!") {
          songList = response.data.message.data;
          nextPage = response.data.message.nextPage;
          status = true;
        }
        this.storageUpdate({
          keyword: value,
          songList: songList,
          nextPage: nextPage
        });
      })
      .catch(error => {
        return {
          keyword: value,
          songList: songList,
          nextPage: nextPage
        };
      });
    return {
      keyword: value,
      songList: songList,
      nextPage: nextPage,
      status: status
    };
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
        `/api/songs/search/${this.state.keyword}?page=${this.state.nextPage}`
      )
      .then(response => {
        if (response.data.message !== "No video found!") {
          this.setState({
            songList: this.state.songList.concat(response.data.message.data),
            nextPage: response.data.message.nextPage
          });
        }
      })
      .catch(error => {});
  }

  render() {
    const { keyword, songList, status } = this.state;
    return (
      <Animated
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        isVisible={true}
      >
        <div className="text-center">
          <div className="search-area-header">
            <span>
              Show results for <span className="search-input">{keyword}</span>
            </span>
          </div>
          <div className="result-set">
            {!status && <div>NO VIDEO FOUND</div>}
            {status && (
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
          {songList.length > 0 && (
            <Button
              outline
              color="primary"
              className="show-more-button"
              onClick={this.showMore}
            >
              Show more
          </Button>)}
        </div>
      </Animated>
    );
  }
}
