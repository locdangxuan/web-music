import React , { Component } from 'react';
import './InfoSong.css'
import {Row, Col } from 'reactstrap';
import Vote from './Vote'
import Image from '/home/locdangxuan/Dev/web-music/src/components/Image/Flower.jpeg'

class InfoSong extends Component{
    render(){
        let url = Image;
        return(
        <Row className="info-song">
            <Col xs="3" className="imgSong">
                <img src = {url} alt="singer" className="imgSinger"/>
            </Col>
            <Col xs="6">
                <p className="songName">{this.props.songName}</p>
                <p className="songSinger">{this.props.songSinger}</p>
            </Col>
            <Col xs="3">
                <Vote/>
            </Col>
        </Row>
        )
    }
}

export default InfoSong;