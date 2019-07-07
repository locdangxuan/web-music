import React, { Component } from 'react';
import axios from 'axios';
import InfoSongSearch from './InfoSongSearch'

export default class ListSongSearch extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: this.props.match.params.text,
            SongList : [],
            videoFound : true
        }
        this.getSongList = this.getSongList.bind(this);
    }
    componentDidMount()
    {
        var value = this.props.match.params.text;
        this.getSongList(value);
    }
    componentDidUpdate()
    {
        
        if(this.state.text !== this.props.match.params.text)
        {
            this.setState({
                text : this.props.match.params.text,
                SongList : [],
                videoFound: true
            })
            this.getSongList(this.props.match.params.text);
        }
    }
    getSongList(value)
    {
        // axios.get(`http://localhost:3000/SearchedSong?song_title=${value}`)
        axios.get(`https://gorgeous-grand-teton-66654.herokuapp.com/api/songs/search/${value}`)
             .then(response => {
                 if(response.data === 'No Video Found')
                    this.setState({ videoFound: false});
                 else{
                    this.setState({
                        text : value,
                        SongList: response.data,
                        videoFound: true
                    })
                    console.log(response.data);
                 }
                 
                 console.log(response.data);
             })
             .catch(error => console.log(error))

        // axios.post('',value)
        //      .then(response => {
        //          this.setState({
        //              text : value,
        //              SongList : response.data
        //          });
        //      })
        //      .catch(error => console.log(error))
    }
    render()
    {
        const {text,videoFound} = this.state;
        const SongList = this.state.SongList;
        console.log("SongList: " +  SongList);
        var elementSong = SongList.map((value, key) => { 
            return <InfoSongSearch id = {value.videoId} song_title = {value.title} singer = {value.channelTitle} views = {'value.views'} imgsrc={value.thumbnails} key = {key}/> 
        })
        
        return(
            <div>
                <div className = "SearchAreaHeader">
                    <span>Show results for <span className = "SearchInput">{text}</span></span>
                </div>
                <div className = "ResultSet">
                    {videoFound === false && <div>NO VIDEO FOUND</div>}
                    {videoFound === true && 
                        <div>
                            {elementSong}
                        </div>
                    }
                </div>
            </div> 
        )
    }

}
