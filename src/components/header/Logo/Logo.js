import React, { Component } from 'react';
import logo from '/home/locdangxuan/Dev/web-music/src/components/Image/code-engine-studio.png'
import './Logo.css'
class Logo extends Component{
    shouldComponentUpdate(){
        return false;
    }
    render(){
        let url = logo;
        return (
            <div className = 'logo-background'>
               <img src = {url} alt = "logo" className = "logo-header"/>
            </div>
        )
     }
}

export default Logo;