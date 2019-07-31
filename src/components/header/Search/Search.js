import React, { Component } from "react";
import "./Search.css";
import { Redirect } from "react-router-dom";
import moment from 'moment';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchingStart: false
    };
    this.enterBtnClick = this.enterBtnClick.bind(this);
  }

  componentDidUpdate() {
    if (this.state.searchingStart === true) {
      this.setState({
        searchingStart: false
      });
    }
  }

  enterBtnClick(event) {
    event.preventDefault();
    if (event.keyCode === 13 && event.target.value !== "") {
      if (moment().isBefore(moment('17:30:0', 'hh:mm:ss'))) {
        this.setState({
          searchText: event.target.value,
          searchingStart: true
        });
      }
    }
  };

  render() {
    const { searchingStart, searchText } = this.state;
    return (
      <div className="search">
        <input
          className="Search-input"
          type="search"
          placeholder="Search"
          onKeyUp={this.enterBtnClick}
        />
        {searchingStart && <Redirect to={"/searching/?q=" + searchText} />}
      </div>
    );
  }
}

export default Search;
