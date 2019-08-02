import React, { Component } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import SidebarPlaylist from "./components/body/Playlist/SidebarPlaylist";
import VideoSong from "./components/body/Detail/VideoSong";
import SearchResultSet from "./components/body/ResultSet/SearchResultSet";
import Playlist from "./components/body/Playlist/Playlist";
import { PlaylistProvider } from "./contexts/PlaylistContext";
import UserModification from "./components/body/UserModification/UserModification";
import CountdownClock from "./components/clock/CountdownClock";
import { UserProvider } from "./contexts/UserContext";
import Footer from "./components/Footer/Footer";
import FooterDetail from "./components/Footer/FooterDetail";
import { NOTFOUND } from "dns";

const NoMatch = ({ location }) => (
  <div style= {{textAlign:"center"}}>
    <h3>404 Not Found</h3>
  </div>
)
class App extends Component {
  render() {
    return (
      <Router>
        <UserProvider>
          <PlaylistProvider>
            <div className="App">
              <Header />
              <CountdownClock />
              <div className="body">
                <Container>
                  <Switch>
                    <Route exact path="/" component={Playlist} />
                    <Route path="/info/" component={UserModification} />
                  </Switch>
                  <Row style={{ backgroundColor: "white", paddingTop: "20px" }}>
                    <Col xs="8">
                      <Switch>
                        <Route path="/searching/" component={SearchResultSet} />
                        <Route exact path="/playing/:songId" component={VideoSong} />
                      </Switch>
                    </Col>
                    <Col xs="4">
                      <Switch>
                        <Route path="/playing/:songId" component={SidebarPlaylist} />
                        <Route path="/searching/" component={SidebarPlaylist} />
                      </Switch>
                    </Col>
                  </Row>
                </Container>
                <Switch>
                  <Route exact path="/" component={Footer} />
                  <Route exact path="/searching" component={FooterDetail} />
                  <Route path="/playing/:songId" component={FooterDetail} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
            </div>
          </PlaylistProvider>
        </UserProvider>
      </Router >
    );
  }
}

export default App;
