import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {MdThumbUp} from 'react-icons/md';
import {MdThumbDown} from 'react-icons/md';
import {Row, Col} from 'reactstrap';
import './InfoSidebarSongAdded.css'

export default class InfoSidebarSongAdded extends Component{
    constructor(props){
        super(props);
        this.state = {
            thumbnail: this.props.thumbnail,
            song_title: this.props.song_title,
            singer: this.props.singer,
            upvote: this.props.upvote,
            downvote: this.props.downvote,
            id: this.props.id,
            token: localStorage.token,
            votingId: this.props.votingId
        }
    }

    upvoteClick = () => {
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

    downvoteClick = () => {
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
        const {thumbnail, song_title, singer, upvote, downvote, id} = this.state;
        return(
            
            <Row>
                <Col xs="3" className="sidebar-song-img">
                    <img src={thumbnail} alt = "#" className="img-fluid"></img>
                </Col>
                <Col xs="6" className="sidebar-song-info">
                    <div className="sidebar-song-title"><Link to={{pathname : '/playing/' + id,state: {title:song_title,singer: singer}}}>{song_title}</Link></div>
                    <div className="sidebar-singer">{singer}</div>
                </Col>
                <Col xs="2" className="button-add">
                    <div className = "upvote">
                        <a onClick = {this.upvoteClick}><MdThumbUp width="30"></MdThumbUp></a>
                        <span className = "amount">{upvote}</span>
                    </div>
                    <div className = "downvote">
                        <a onClick = {this.downvoteClick}><MdThumbDown width="30"></MdThumbDown></a>
                        <span className = "amount">{downvote}</span>
                    </div>
                </Col>
            </Row>
        )
    }
}