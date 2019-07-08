import React, { Component } from 'react';
import Video from '../../Image/youtube.png';
import {MdThumbUp} from 'react-icons/md';
import {MdThumbDown} from 'react-icons/md';
import {Row, Col } from 'reactstrap';
// import 
import './VideoSong.css'
import {Button} from 'reactstrap'
// import InfoSongSearch from '../ListAddSong/InfoSongSearch'
export default class VideoSong extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        let url = Video;
        return(
            <div className="videoSong">
                <div className="video text-center">
                    <img src={url} alt="VideoSong" className="video img-fluid" style = {{width: "700px"}}/>
                </div>
                <div className="song-video-name">
                    Payphone
                    <div className="react">
                        {/* <div className="react-like">
                            <MdThumbUp className="like"></MdThumbUp>
                            <span>0</span>
                        </div>
                        <div className="react-dislike">
                            <MdThumbDown className="disLike"></MdThumbDown>
                            <span>0</span>
                        </div> */}
                        <Button outline color="primary" className="btnAdd">Add</Button>
                    </div>
                </div>

                <div className="Singer">
                    Marron 5
                </div>
            </div>
            
        )
    }
}