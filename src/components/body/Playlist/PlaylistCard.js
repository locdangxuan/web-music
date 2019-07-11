import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {MdThumbUp} from 'react-icons/md';
import {MdThumbDown} from 'react-icons/md';
import './PlaylistCard.css';
import { PlaylistContext } from '../../../contexts/PlaylistContext';




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
    
    render(){
            const {thumbnail,singer,song_title,adder,upvote,downvote,id, votingID} = this.state;
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
                        <PlaylistContext.Consumer>
                            {({ clickToVote }) => (
                                <div className="sidebar-vote">
                                    <div className="upvote">
                                        <MdThumbUp width="30" onClick={() =>clickToVote(votingID, true)} className="likeList"></MdThumbUp>
                                        <span className="amount">{upvote}</span>
                                    </div>
                                    <div className="downvote">
                                        <MdThumbDown width="30" onClick={() => clickToVote(votingID, false)} className="disLikeList"></MdThumbDown>
                                        <span className="amount">{downvote}</span>
                                    </div>
                                </div>
                            )}
                        </PlaylistContext.Consumer>
                    </div>
                </div>
        )
    }
}