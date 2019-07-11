import React, {Component} from 'react';
import './App.css';
import Header from './components/header/Header';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import SidebarPlaylist from './components/body/Playlist/SidebarPlaylist'
import VideoSong from './components/body/Detail/VideoSong'
import SearchResultSet from './components/body/ResultSet/SearchResultSet'
import Playlist from './components/body/Playlist/Playlist'
import { PlaylistProvider } from './contexts/PlaylistContext';


class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
          <Header />
          <div className = "body">
          <PlaylistProvider>
            <Container>
              <Route exact path = "/" component={Playlist}></Route>
              <Row style={{backgroundColor: "white", paddingTop: "20px"}}>                  
                  <Col xs="8">
                    <Route path = "/searching/:text" component={SearchResultSet}></Route>
                    <Route exact path = "/playing/:id" component={VideoSong}></Route>
                  </Col>
                  <Col xs="4" >
                    <Route path = "/playing/:id" component={SidebarPlaylist}></Route>
                    <Route path = "/searching/" component={SidebarPlaylist}></Route>
                  </Col>
              </Row>
            </Container>
          </PlaylistProvider>
           </div>
        </div>
      </Router>
    );
  }
}

export default App;
