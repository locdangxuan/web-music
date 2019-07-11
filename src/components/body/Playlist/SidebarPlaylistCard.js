import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdThumbUp} from 'react-icons/md';
import {MdThumbDown} from 'react-icons/md';
import {Row, Col} from 'reactstrap';
import './SidebarPlaylistCard.css';
import { PlaylistContext } from '../../../contexts/PlaylistContext';


export default class SidebarPlaylistCard extends Component{
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
            votingID: this.props.votingID
        }
    }


    render(){
        const {thumbnail, song_title, singer, upvote, downvote, votingID, id} = this.state;
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
                <PlaylistContext.Consumer>
                    {({clickToVote}) => (
                <Col xs="1" className="vote">
                    <div className="up-vote">
                        <MdThumbUp className="likeList" onClick = {() => clickToVote(votingID,true)}></MdThumbUp>   
                        <div className="text-center"><span className="num-vote">{upvote}</span> </div>
                    </div>
                    <div className="down-vote">
                        <MdThumbDown className="disLikeList" onClick = {() => clickToVote(votingID,false)}></MdThumbDown>
                        <div className="text-center"><span className="num-vote">{downvote}</span> </div>
                    </div>
                </Col>
                    )}
                </PlaylistContext.Consumer>
            </Row>
        )
    }
}