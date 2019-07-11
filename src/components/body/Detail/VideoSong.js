import React, { Component } from 'react'; 
import './VideoSong.css';
import {Button} from 'reactstrap';
// import InfoSongSearch from '../ListAddSong/InfoSongSearch'
import Iframe from 'react-iframe'
export default class VideoSong extends Component{
    constructor(props){
        super(props);
        this.state = { 
            id : this.props.match.params.id,
            singer : this.props.location.state.singer,
            title: this.props.location.state.title
        };
        console.log(this.state.id);
    }

    componentDidUpdate = () => { 
        if(this.state.id !== this.props.match.params.id)
        {
            this.setState({
                id : this.props.match.params.id,
                singer : this.props.location.state.singer,
                title: this.props.location.state.title
            })
        }
        
    }
    
    render(){
        const {id,singer,title} = this.state;
        return(
            <div className="videoSong">
                <div className="video text-center">
                    <Iframe src={`https://www.youtube.com/embed/${id}`}
                            height="450px"
                            id="myId"
                            className="embed-responsive embed-responsive-4by3"
                            display="initial"
                            position="relative"/>
                </div>
                <div className="song-video-name">
                    <div className="react">
                        <Button outline color="primary" className="btnAdd">Add</Button>
                    </div>
                </div>
                <div className="Singer">
                    <p>{title}</p>
                    <p>{singer}</p>
                </div>
            </div>
            
        )
    }
}