import React, { Component } from 'react';
import logo from '../../Image/code-engine-studio.png'
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