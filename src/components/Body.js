import React, {Component} from 'react';
import './Body.css';
import Playlist from './body/Playlist';
import VideoSong from './body/VideoSong'
import { Container, Row, Col } from 'reactstrap';

class Body extends Component{
    
    render(){
        
        return(
            <div className = "body">
                <Container>
                    <Row style={{backgroundColor: "#FF9D37", paddingTop: "20px"}}>
                        <Col xs="7">
                            <VideoSong/>
                        </Col>
                        <Col xs="5">
                            <div className="text-center">
                                <p>Tiếp theo</p>
                            </div>
                            <Playlist/>
                        </Col>
                    </Row>
                </Container>
                
                
           </div>
        )
    }
}

export default Body;