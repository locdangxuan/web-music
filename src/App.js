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
// import Footer from "./components/Footer/Footer";
import FooterDetail from "./components/Footer/FooterDetail";

class App extends Component {
  render() {
    return (
      <Router>
        <UserProvider>
          <div className="App">
            <Header />
            <div className="body">
              <PlaylistProvider>
                <CountdownClock />
                <Container>
                  <Route exact path="/" component={Playlist} />
                  <Route path="/info/" component={UserModification} />
                  <Row style={{ backgroundColor: "white", paddingTop: "20px" }}>
                    <Col xs="8">
                      <Route path="/searching/" component={SearchResultSet} />
                      <Route
                        exact
                        path="/playing/:songId"
                        component={VideoSong}
                      />
                    </Col>
                    <Col xs="4">
                      <Route
                        path="/playing/:songId"
                        component={SidebarPlaylist}
                      />
                      <Route path="/searching/" component={SidebarPlaylist} />
                    </Col>
                  </Row>
                </Container>
                {/* <Route exact path="/" component={Footer} /> */}
                <Route exact path="/" component={FooterDetail} />
              </PlaylistProvider>
            </div>
          </div>
        </UserProvider>
      </Router>
    );
  }
}

export default App;
