import React, { Component } from "react";
import axios from "axios";
import SearchResultCard from "./SearchResultCard";
import { server } from "../../../server.js";
import {Button} from 'reactstrap';
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
    this.loadResult(this.props.match.params.text);
  }

  componentDidUpdate() {
    //Khi keyword tren url thay doi thi ham loadResult se duoc goi
    if (this.state.text !== this.props.match.params.text) {
      this.loadResult(this.props.match.params.text);
    }
  }

  async loadResult(keyword) {
    //Xoa cac ket qua hien co
    await this.setState({
      text: this.props.match.params.text,
      SongList: [],
      videoFound: true
<<<<<<< HEAD
    });

    const storage = localStorage.getItem("SearchingHistory");
=======
    })

    const storage = localStorage.getItem('SearchingHistory');
>>>>>>> 22/07
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
      .then(response => {
        if (response.data === "No Video Found") {
          this.setState({ videoFound: false });
        } else {
          this.setState({
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

  showMore = async () => {
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
    console.log(this.state);
  };

  render() {
    const { text, videoFound } = this.state;
    const SongList = this.state.SongList;
    return (
      <div className="text-center">
        <div className="SearchAreaHeader text-center">
          <span>
            Show results for <span className="SearchInput">{text}</span>
          </span>
        </div>
        <div className="ResultSet">
          {videoFound === false && <div>NO VIDEO FOUND</div>}
          {videoFound === true && (
            <div>
              {SongList.map((value, key) => {
                return (
                  <SearchResultCard
                    id={value.videoId}
                    song_title={value.title}
                    singer={value.channelTitle}
                    imgsrc={value.thumbnails}
                    key={key}
                  />
                );
              })}
            </div>
          )}
        </div>{" "}
        <Button outline color="primary" className="show-more-btn"
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
