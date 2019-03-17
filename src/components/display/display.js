import React, { Component } from 'react';
import './style.css';

class Display extends Component{
    render(){
        return <div className={this.props.displayStyle}></div>
    }
}
export default Display;