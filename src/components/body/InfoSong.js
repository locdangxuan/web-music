import React , { Component } from 'react';
import './InfoSong.css'
import {Row, Col } from 'reactstrap';
import Vote from './Vote'
import Image from '../Image/Flower.jpeg'

class InfoSong extends Component{
    render(){
        let url = Image;
        return(
        <Row className="info-song">
            <Col xs="4">
                <img src = {url} alt="singer" className="imgSinger"/>
            </Col>
            <Col xs="6">
                <p className="songName">{this.props.songName}</p>
                <p className="songSinger">{this.props.songSinger}</p>
            </Col>
            <Col xs="2">
                <Vote/>
            </Col>
        </Row>
        )
    }
}

export default InfoSong;