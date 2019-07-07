import React , { Component } from 'react';
import './Playlist.css'
import InfoSong from './InfoSong';


class Playlist extends Component{
    constructor(props){
        super(props);
        this.state = {
            songs: [
                {
                    id: 1,
                    songName: "Superheroes",
                    songSinger: "Script",
                    voted: false
                },
                {
                    id: 2,
                    songName: "Payphone",
                    songSinger: "Marron 5",
                    voted: false
                },
                {
                    id: 3,
                    songName: "Gold skies",
                    songSinger: "Martin Garrix",
                    voted: false
                }
            ]
        };
        //let {songs} = this.state 
        //console.log(songs[1]);
    }
    render(){
        const{songs} = this.state;
        //console.log(songs[1]);
        let listSong = songs.map((song, index) => {
                return <InfoSong id = {song.id}
                                 key = {song.id}
                                 songName = {song.songName} 
                                 songSinger = {song.songSinger}>
                        </InfoSong>
            })
        return(
            <div className="Play-list-song" id="style-2">
                {listSong}
                <InfoSong songName="NameOfSong" songSinger="NameofSinger"></InfoSong>
                <InfoSong songName="NameOfSong" songSinger="NameofSinger"></InfoSong>
                <InfoSong songName="NameOfSong" songSinger="NameofSinger"></InfoSong>
                <InfoSong songName="NameOfSong" songSinger="NameofSinger"></InfoSong>
                <InfoSong songName="NameOfSong" songSinger="NameofSinger"></InfoSong>
                <InfoSong songName="NameOfSong" songSinger="NameofSinger"></InfoSong>
                <InfoSong songName="NameOfSong" songSinger="NameofSinger"></InfoSong>
                <InfoSong songName="NameOfSong" songSinger="NameofSinger"></InfoSong>
                <InfoSong songName="NameOfSong" songSinger="NameofSinger"></InfoSong>
                <InfoSong songName="NameOfSong" songSinger="NameofSinger"></InfoSong>
                <InfoSong songName="NameOfSong" songSinger="NameofSinger"></InfoSong>
            </div>
        )
    }
}

export default Playlist;