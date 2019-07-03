import React , { Component } from 'react';
import './Vote.css'
import {MdThumbUp} from 'react-icons/md';
import {MdThumbDown} from 'react-icons/md';


class Vote extends Component{
    constructor(props){
        // console.log('Vote constructor');
        super(props);
        this.state = {
            vote: 0,
            status: false
        };
    }
    upVote(){
        if(this.state.status === false){
            this.setState({
                vote: this.state.vote + 1,
                status: true
            })
        }else{
            this.setState({
                vote: this.state.vote - 1,
                status: false
            })
        }
    }

    downVote(){
        if(this.state.status === false){
            this.setState({
                vote: this.state.vote - 1,
                status: true
            })
        }else{
            this.setState({
                vote: this.state.vote + 1,
                status: false
            })
        }
    }
    render(){
        // console.log('vote render')
        return(
            <div className = "vote">
                <MdThumbUp className="likeList" onClick = {() => this.upVote()}></MdThumbUp>   
                <div><span>{this.state.vote}</span>   </div>
                <MdThumbDown className="disLikeList" onClick = {() => this.downVote()}></MdThumbDown>
                                     
            </div>
        )
    }

    // componentDidMount(){
    //     console.log("vote did mount");
    // }

    // componentDidUpdate(){
    //     console.log("Vote did update");
    // }

    // componentWillMount(){
    //     console.log('Vote will mount');
    // }
}
export default Vote 