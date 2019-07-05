import React, { Component } from 'react';
import Video from '/home/locdangxuan/Dev/web-music/src/components/Image/youtube.png';
import {MdThumbUp} from 'react-icons/md';
import {MdThumbDown} from 'react-icons/md';
import {Row, Col } from 'reactstrap';
import './VideoSong.css'
export default class VideoSong extends Component{
    render(){
        let url = Video;
        return(
            <div className="videoSong text-center">
                <img src={url} alt="VideoSong" className="video img-fluid" style = {{width: "700px"}}/>
                <Row>
                    <Col xs="6">
                        <h1>Attention</h1>
                        <h2>J.Fla</h2>
                        <p>Category: US-UK, Pop</p>
                    </Col>
                    <Col xs="6" className="numOfVote">
                        <div className="numOfReact">
                            <div className="react">
                                <MdThumbUp className="like"></MdThumbUp>
                                <p>12000</p>
                            </div>
                            <div className="react">
                                <MdThumbDown className="disLike"></MdThumbDown>                                
                                <p>500</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}