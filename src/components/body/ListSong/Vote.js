import React , { Component } from 'react';
import './Vote.css'
import {MdThumbUp} from 'react-icons/md';
import {MdThumbDown} from 'react-icons/md';


class Vote extends Component{
    constructor(props){
        // console.log('Vote constructor');
        super(props);
        this.state = {
            upVote: 0,
            downVote: 0,
            status: false
        };
    }
    upVoteClick(){
        if(this.state.status === false){
            this.setState({
                upVote: this.state.upVote + 1,
                downVote: this.state.downVote,
                status: true
            })
        }else{
            this.setState({
                upVote: this.state.upVote - 1,
                status: false,
            })
        }
    }

    downVoteClick(){
        if(this.state.status === false){
            this.setState({
                upVote: this.state.upVote,
                downVote: this.state.downVote - 1,
                status: true
            })
        }else{
            this.setState({
                downVote: this.state.downVote + 1,
                status: false
            })
        }
    }
    render(){
        // console.log('vote render')
        return(
            <div className = "vote">
                {/* <MdThumbUp className="likeList" onClick = {() => this.upVote()}></MdThumbUp>   
                <div><span>{this.state.vote}</span> </div>
                <MdThumbDown className="disLikeList" onClick = {() => this.downVote()}></MdThumbDown> */}
                <div className="up-vote">
                    <MdThumbUp className="likeList" onClick = {() => this.upVoteClick()}></MdThumbUp>   
                    <div><span>{this.state.upVote}</span> </div>
                </div>
                <div className="down-vote">
                    <MdThumbDown className="disLikeList" onClick = {() => this.downVoteClick()}></MdThumbDown>
                    <div><span>{this.state.downVote}</span> </div>
                </div>
            </div>
        )
    }

}
export default Vote 