import React, {Component} from 'react';
import './Search.css'
import {FaSearch} from "react-icons/fa";



class Search extends Component{
    render(){
        return(
            <div className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="searchbar">
                        <input className="search_input" type="text" name="" placeholder="Search..."/>
                        <a href="#" className="search_icon"><FaSearch className = "icon-search"/></a>
                    </div>
                </div>
            </div>
        )
    }
}
export default Search;
