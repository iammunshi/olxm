import React, { Component } from 'react';
import './style.css';

class CustomButton extends Component{
    render(){
        return <button className={this.props.style}>{this.props.text}</button>
    }
}

export default CustomButton;