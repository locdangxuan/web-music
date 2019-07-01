import React, {Component} from 'react';
import './Search.css'
import {FaSearch} from "react-icons/fa";



class Search extends Component{
    render(){
        return(
            <div className = "search-box">
                <a className = "search-btn" 
                   href = "#">
                    <FaSearch className = "icon-search"/>
                </a>
                <input type = "text" 
                       name = "" 
                       placeholder = "    Search"
                       className = "input-text"/>
            </div>
        )
    }
}
export default Search;