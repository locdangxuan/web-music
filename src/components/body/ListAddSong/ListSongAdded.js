import React, { Component } from 'react';
import axios from 'axios';
import InfoSongAdded from './InfoSongAdded';
import './ListSongAdded.css';
// import playlistHeader from './playlist-header.svg';

export default class ListSongAdded extends Component
{
    constructor()
    {
        super();
        this.state = {
            playlist: []
        }
    }
    componentWillMount()
    {
        axios.get('https://gorgeous-grand-teton-66654.herokuapp.com/api/songs/get/list')
             .then(response => {
                // response.data.sort(function(b,a) {
                //     return (parseInt(a.upvote) - parseInt(a.downvote)) - (parseInt(b.upvote) - parseInt(b.downvote));}
                //     ); 
                this.setState({
                    playlist : response.data
                })
                localStorage.setItem('Playlist',JSON.stringify(response.data));
                console.log(this.state.playlist);
             })
             .catch(error => {console.log(error)})
    }
    render()
    {
        const {playlist} = this.state;
        return(
            <div className = "main-playlist">
                <div className = "playlist-header">
                    {/* <span>CES's FAVOURITE SONGs TOURNAMENT</span> */}
                    {/* <img src = {playlistHeader} alt = "header"/> */}
                </div>
                <div>
                {playlist.map((value,index) => {
                    return <InfoSongAdded id = {value.videoID} song_title = {value.title} singer = {value.channelTitle} adder = {value.user}
                    thumbnail = {value.thumbnails} upvote = {value.upvote} downvote = {value.downvote} key = {index} voteValue = {value.voteValue}
                    votingID ={value._id}/>
                })}
                </div>
            </div>
        )
    }
} 