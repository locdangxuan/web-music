import React, {Component} from 'react';
import './App.css';
import Header from './components/header/Header';
// import Body from './components/body/Body';
import {BrowserRouter as Router, Route} from "react-router-dom";

import { Container, Row, Col } from 'reactstrap';
import Playlist from './components/body/ListSong/Playlist';
import VideoSong from './components/body/ListSong/VideoSong'
import ListSongSearch from './components/body/ListAddSong/ListSongSearch'


class App extends Component {
  
  render(){
    return (
      <Router>
        <div className="App">
          <Header />
          <div className = "body">
            <Container>
              <Row style={{backgroundColor: "white", paddingTop: "20px"}}>
                  <Route path = "/home" component={Playlist}></Route>
                  <Col xs="7">
                      <Route path = "/searching/:text" component={ListSongSearch}></Route>
                      <Route path = "/playing/" component={VideoSong}></Route>
                  </Col>
                  <Col xs="5" >
                  <Route path = "/playing/" component={Playlist}></Route>
                  <Route path = "/searching/:text" component={Playlist}></Route>
                      {/* <Playlist/> */}
                  </Col>
              </Row>
            </Container>
           </div>
        </div>
      </Router>
    
    );
  }
}

export default App;
