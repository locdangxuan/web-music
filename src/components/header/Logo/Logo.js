import React, { Component } from 'react';
import logo from '../../Image/ces.png'
import './Logo.css'
class Logo extends Component{
    shouldComponentUpdate(){
        return false;
    }
    render(){
        let url = logo;
        return (
            <div className = 'logo-background img-fluid'>
               <img src = {url} alt = "logo" className = "logo-header"/>
            </div>
        )
     }
}

export default Logo;