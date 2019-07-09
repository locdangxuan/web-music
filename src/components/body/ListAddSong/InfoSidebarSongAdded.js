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
        console.log(typeof this.state.song_title)
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
        const MAX_LENGTH = 40;
        return(
            
            <Row className="sidebar-song">
                <Col xs="4" className="sidebar-song-img">
                    <img src={thumbnail} alt = "#" className="img-fluid"></img>
                </Col>
                <Col xs="6" className="sidebar-song-info">
                    <div className="sidebar-song-title">
                    {song_title.length > MAX_LENGTH ? (
                        <Link to={{pathname : '/playing/' + id,state: {title:song_title,singer: singer}}}>
                        {`${song_title.substring(0,MAX_LENGTH)}...`}
                        </Link>
                    ) : 
                        <Link to={{pathname : '/playing/' + id,state: {title:song_title,singer: singer}}}>
                            {song_title}
                        </Link>
                    }
                    </div>

                    <div className="sidebar-song-singer">
                        {singer}
                    </div>
                </Col>
                <Col xs="1" className="vote">
                    <div className="up-vote">
                        <MdThumbUp className="likeList" onClick = {this.upvoteClick}></MdThumbUp>   
                        <div className="text-center"><span className="num-vote">{upvote}</span> </div>
                    </div>
                    <div className="down-vote">
                        <MdThumbDown className="disLikeList" onClick = {this.downvoteClick}></MdThumbDown>
                        <div className="text-center"><span className="num-vote">{downvote}</span> </div>
                    </div>
                </Col>
            </Row>
        )
    }
}