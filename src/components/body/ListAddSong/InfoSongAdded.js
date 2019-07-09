import React, {Component} from 'react';
// import {Row, Col} from 'reactstrap';
// import Image from '/home/locdangxuan/Dev/web-music/src/components/Image/Flower.jpeg'
import axios from 'axios';
import {Link} from 'react-router-dom';
import {MdThumbUp} from 'react-icons/md';
import {MdThumbDown} from 'react-icons/md';
import './InfoSongAdded.css'



export default class InfoSongAdded extends Component{
    constructor(props){
        super(props);
        this.state = {
            thumbnail : this.props.thumbnail,
            song_title : this.props.song_title,
            singer : this.props.singer,
            adder : this.props.adder,
            upvote : this.props.upvote,
            downvote : this.props.downvote,
            id : this.props.id,
            token :localStorage.token,
            votingID : this.props.votingID
        }
    }

    upvoteOnClick = () => {
        const ls = localStorage.getItem('Token');
        if(ls === null) alert('Please log in to vote ');
        else{
            axios({
                method: 'POST',
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('Token')).token}`},
                url: 'https://lovely-hot-springs-99494.herokuapp.com/api/songs/vote',
                data: 
                {
                    video_id: this.state.votingID,
                    isUpvote: true
                }
            })
        }
        
    }

    downvoteOnClick = () => {
        const ls = localStorage.getItem('Token');
        if(ls === null ) alert('Please log in to vote ')
        else{
            axios({
                method: 'POST',
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('Token')).token}`},
                url: 'https://lovely-hot-springs-99494.herokuapp.com/api/songs/vote',
                data: 
                {
                    video_id: this.state.votingID,
                    isUpvote: false
                }
            })
        }
        
    }

    render(){
            const {thumbnail,singer,song_title,adder,upvote,downvote,id} = this.state;
            return(
                <div className = "playlist-card">
                    <div className = "thumbnail">
                        <img src = {thumbnail} alt = "#" width = {100} />
                    </div>
                    <div className = "info">
                        <div className = "song-title"><Link to = {{pathname : '/playing/' + id,state: {title:song_title,singer: singer}}}>{song_title}</Link></div>
                        <div className = "singer">{singer}</div>
                    </div>
                    <div className = "user-relation">
                        <div className = "adder">{adder}</div>
                        <div className = "upvote">
                            <a onClick = {this.upvoteOnClick}><MdThumbUp width="30"></MdThumbUp></a>
                            <span className = "amount">{upvote}</span>
                        </div>
                        <div className = "downvote">
                            <a onClick = {this.downvoteOnClick}><MdThumbDown width="30"></MdThumbDown></a>
                            <span className = "amount">{downvote}</span>
                        </div>
                    </div>
                </div>
        )
    }
}