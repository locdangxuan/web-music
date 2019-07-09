import React, {Component} from 'react';
import axios from 'axios';
import InfoSidebarSongAdded from './InfoSidebarSongAdded';


export default class SidebarSongAdded extends Component{
    constructor(props){
        super(props);
        this.state = {
            sidebarPlaylist: []
        }
    }

    componentWillMount = () => {
        axios.get('https://gorgeous-grand-teton-66654.herokuapp.com/api/songs/get/list')
             .then(response => {
                 this.setState({
                     sidebarPlaylist: response.data
                 })
                 localStorage.setItem('sidebarPlaylist', JSON.stringify(response.data));
                 console.log(this.state.sidebarPlaylist);
             })
             .catch(error => {console.log(error)})
    }

    render(){
        const {sidebarPlaylist} = this.state;
        return(
            <div className="sidebar-playlist">
                {
                    sidebarPlaylist.map((value, index) => {
                        return <InfoSidebarSongAdded id = {value.videoID} song_title = {value.title} singer = {value.channelTitle} 
                        thumbnail = {value.thumbnails} upvote = {value.upvote} downvote = {value.downvote} key = {index} voteValue = {value.voteValue}
                        votingID ={value._id}/>
                    })
                }
            </div>

        )
    }
}