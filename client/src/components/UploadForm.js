import React, {Component} from 'react';
import axios from 'axios';

export default class UploadForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            isProcessing: false,
            fileNameSelected: 'Please select a file',
            file: {}
        };
    }

    handleFileSelected = async (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onload = (e) => {
            console.log(e.target);
        };

        reader.readAsDataURL(file);
    };

    render(){
        return(
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input type="file" onChange={this.handleFileSelected} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" value={this.state.fileNameSelected} readOnly />
                    </div>
                </div>
        );
    }
}