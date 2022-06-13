import React, { useState } from "react";
import Select, { StylesConfig } from "react-select";
import chroma from "chroma-js";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'unknown', label: 'Unknown' },
    { value: 'hello', label: 'Hello' }
  ]
    
class Color extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Select
                options={options}/>
        
        );
    }
}

export default Color;