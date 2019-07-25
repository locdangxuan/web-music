import React, { Component } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import SidebarPlaylist from "./components/body/Playlist/SidebarPlaylist";
import VideoSong from "./components/body/Detail/VideoSong";
import SearchResultSet from "./components/body/ResultSet/SearchResultSet";
import Playlist from "./components/body/Playlist/Playlist";
import { PlaylistProvider } from "./contexts/PlaylistContext";
import UserModification from "./components/body/UserModification/UserModification";
import CountdownClock from "./components/clock/CountdownClock";
import { UserProvider } from "./contexts/UserContext";

class App extends Component {
  render() {
    return (
      <Router>
        <UserProvider>
          <div className="App">

            <Header />
            <CountdownClock />
            <div className="body">
              <CountdownClock />
              <PlaylistProvider>
                <Container>
                  <Route exact path="/" component={Playlist} />
                  <Route path="/info/" component={UserModification} />
                  <Row style={{ backgroundColor: "white", paddingTop: "20px" }}>
                    <Col xs="8">
                      <Route
                        path="/searching/:text"
                        component={SearchResultSet}
                      />
                      <Route exact path="/playing/:id" component={VideoSong} />
                    </Col>
                    <Col xs="4">
                      <Route path="/playing/:id" component={SidebarPlaylist} />
                      <Route path="/searching/" component={SidebarPlaylist} />
                    </Col>
                  </Row>
                </Container>
              </PlaylistProvider>
            </div>
          </div>
        </UserProvider>
      </Router>
    );
  }
}

export default App;
