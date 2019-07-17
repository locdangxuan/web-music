import React, { Component } from "react";
import axios from "axios";
import SearchResultCard from "./SearchResultCard";
// import { gorgeous_server } from "../../../server.js";
import { server } from "../../../server.js";

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
<<<<<<< HEAD
    console.log("1");
=======
>>>>>>> 34fcf29b0085d75e596f939f3b2c217a291918d5
    await this.setState({
      text: this.props.match.params.text,
      SongList: [],
      videoFound: true
<<<<<<< HEAD
    });
    console.log("2");
    const storage = localStorage.getItem("SearchingHistory");
=======
    })
    
    const storage = localStorage.getItem('SearchingHistory');
>>>>>>> 34fcf29b0085d75e596f939f3b2c217a291918d5
    if (storage === null) {
      this.getSongList(keyword);
      console.log("Case1");
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
        console.log(this.state);
        console.log("Case3");
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
            videoFound: true
          });
          this.storageUpdate({ keyword: value, songList: response.data.data });
          console.log("Case2");
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    const { text, videoFound } = this.state;
    const SongList = this.state.SongList;
    var elementSong = SongList.map((value, key) => {
      return (
        <SearchResultCard
          id={value.videoId}
          song_title={value.title}
          singer={value.channelTitle}
          views={"value.views"}
          imgsrc={value.thumbnails}
          key={key}
        />
      );
    });
    return (
      <div>
        <div className="SearchAreaHeader text-center">
          <span>
            Show results for <span className="SearchInput">{text}</span>
          </span>
        </div>
        <div className="ResultSet">
          {videoFound === false && <div>NO VIDEO FOUND</div>}
          {videoFound === true && <div>{elementSong}</div>}
        </div>
      </div>
    );
  }
}
