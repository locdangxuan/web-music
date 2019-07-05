import React, {Component} from 'react';
import {Row, Col} from 'reactstrap'
import Image from '/home/locdangxuan/Dev/web-music/src/components/Image/Flower.jpeg'


export default class ListSongAdded extends Component{
    constructor(props){
        super(props);
        this.state = {
            songs: ''
        }
    }

    onGenerateSong = () => {
        var songs = [
            {},
            {},
            {},
        ]
    }
    render(){
        let url = Image;
        return(
            <Row className="list-song-add">
                <Col xs="4">
                    <img src = {url} alt="singer" className="imgSinger"/>
                </Col>
                <Col xs="6">
                    <p className="songName"></p>
                    <p className="songSinger"></p>
                </Col>
                <Col xs="2">
                </Col>
            </Row>
        )
    }
}