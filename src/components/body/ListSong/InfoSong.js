import React , { Component } from 'react';
import './InfoSong.css'
import {Row, Col } from 'reactstrap';
import Vote from './Vote'
import Image from '..src//Image/Flower.jpeg'

class InfoSong extends Component{
    render(){
        let url = Image;
        return(
        <Row className="info-song">
            <Col xs="5" className="imgSong">
                <p className="rank">1</p>
                <img src = {url} alt="singer" className="imgSinger img-fluid"/>
            </Col>
            <Col xs="4" className="title">
                <p className="songName">{this.props.songName}</p>
                <p className="songSinger">{this.props.songSinger}</p>
            </Col>
            <Col xs="3" style={{alignSelf: "center"}}>
                <Vote/>
            </Col>
        </Row>
        )
    }
}

export default InfoSong;