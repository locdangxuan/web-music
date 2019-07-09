import React, {Component} from 'react';
import './App.css';
import Header from './components/header/Header';
// import Body from './components/body/Body';
import {BrowserRouter as Router, Route} from "react-router-dom";

import { Container, Row, Col } from 'reactstrap';
// import Playlist from './components/body/ListSong/Playlist';
import SidebarSongAdded from './components/body/ListAddSong/SidebarSongAdded'
import VideoSong from './components/body/ListSong/VideoSong'
import ListSongSearch from './components/body/ListAddSong/ListSongSearch'
import ListSongAdded from './components/body/ListAddSong/ListSongAdded'


class App extends Component {
  
  render(){
    return (
      <Router>
        <div className="App">
          <Header />
          <div className = "body">
            <Container>
              <Route exact path = "/" component={ListSongAdded}></Route>
              <Row style={{backgroundColor: "white", paddingTop: "20px"}}>                  
                  <Col xs="7">
                      <Route path = "/searching/:text" component={ListSongSearch}></Route>
                      <Route path = "/playing/:id" component={VideoSong}></Route>
                  </Col>
                  <Col xs="5" >
                    <Route path = "/playing/:id" component={SidebarSongAdded}></Route>
                    <Route path = "/searching/" component={SidebarSongAdded}></Route>
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
