import React, { Component } from 'react';
import axios from 'axios';

import { server } from '../server';

export const PlaylistContext = React.createContext();

export class PlaylistProvider extends Component {
    constructor() {
        super();
        this.state = {
            playlist: []
        }
        this.getPlaylist = this.getPlaylist.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.clickToVote = this.clickToVote.bind(this);
    }
    componentWillMount() {
        this.getPlaylist();
    }
    clickToVote(Id, isUpvote) {
        const token = localStorage.getItem('Token');
        if (token === null) alert('Please log in to vote ');
        else {
            axios({
                method: 'POST',
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('Token')).token}` },
                url: 'https://lovely-hot-springs-99494.herokuapp.com/api/songs/vote',
                data:
                {
                    video_id: Id,
                    isUpvote: isUpvote
                }
            })
                .then(response => {
                    if(response.status === 202)
                        alert('You have used all your votes today, please comeback tomorrow');
                    else if(response.status === 201){
                        alert('Successfully Voted !!!');
                        this.getPlaylist();
                    }    
                })
                .catch(error => {
                    alert('Voted Fail !!! Please try again later');
                    console.log(error);
                })
        }
        
    }
    addToPlaylist(videoId) {
        axios({
            method: 'POST',
            headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')).token },
            url: server + '/songs/add',
            data: {
                id: videoId
            }
        })
            .then(response => {
                console.log(response)
                if (response.status === 200)
                    alert('This account has already added a song, try again tomorrow!!');
                else {
                    alert('Successfully added');
                    this.getPlaylist();
                }
            })
            .catch(error => { console.log(error) })
        console.log('Clicked')
    }
    getPlaylist() {
        this.setState({
            playlist: []
        })
        axios.get(server + `/songs/playlist`)
            .then(response => {
                this.setState({
                    playlist: response.data
                })
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <PlaylistContext.Provider
                value={{
                    playlist: this.state.playlist,
                    addToPlaylist: this.addToPlaylist,
                    clickToVote: this.clickToVote
                }}
            >
                {this.props.children}
            </PlaylistContext.Provider>
        )
    }
}