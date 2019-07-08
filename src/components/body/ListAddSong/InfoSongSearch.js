import React, { Component } from 'react';
import './InfoSongSearch.css'
import axios from 'axios';
import {Button, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class InfoSongSearch extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isLoggedIn: true,
            imgsrc : this.props.imgsrc,
            song_title : this.props.song_title,
            singer : this.props.singer,
            id : this.props.id
        }      
    }
    onClickHandle = () => {
      const token = localStorage.getItem('Token');
      if(token === null) alert("Please log in to add the song to the company's playlist");
      else
      {
        alert('Song Added');
        //var SongAdded = { id: this.state.id, token: JSON.stringify(localStorage.getItem("Token")).token}
        // axios.post('',SongAdded)
        //      .then(response =>
        //         {
        //             alert(response.data);
        //         })
        //      .catch(error =>
        //         {
        //             console.log(error);
        //             alert(error);
        //         })
      }       
    }
    render()
    {
        const{song_title,singer,id,isLoggedIn,imgsrc} = this.state;
        return(
            <Row className="musicCard">
                <Col xs="3" className="picture">
                <   img src={imgsrc} alt="#" className="img-fluid"/>
                </Col>
                <Col xs="7" className="info">
                    <div className="song-title"><Link to={'/playing/' + id}>{song_title}</Link></div>
                    <div className="singer">{singer}</div>
                </Col>
                <Col xs="2" className="button-add">
                    {isLoggedIn && 
                    <Button outline color = "primary" className="addBtn" onClick={this.onClickHandle}>Add</Button>
                    }
                </Col>
                
            </Row>
        )
    }
}