import React, { Component } from 'react';
import PlaylistCard from './PlaylistCard';
import './Playlist.css';
import { PlaylistContext } from '../../../contexts/PlaylistContext';


export default class Playlist extends Component
{
    constructor(){
        super();
        this.state = {
            playlist: []
        }
    }
    
    render(){
        return(
            <div className="main-playlist">
                <div className="playlist-header">
                    <span>CES's FAVOURITE SONGs TOURNAMENT</span>
                </div>
                <PlaylistContext.Consumer>
                        {
                            ({ playlist }) => (
                                playlist.map((value, index) => {
                                    return <PlaylistCard id={value.videoId} song_title={value.title} singer={value.channelTitle} 
                                            adder={value.user} thumbnail={value.thumbnails} upvote={value.upvote} downvote={value.downvote} 
                                            key={index} duration={value.duration} votingID={value._id} />
                                })
                            )
                        }
                </PlaylistContext.Consumer>
            </div>
        )
    }
} 