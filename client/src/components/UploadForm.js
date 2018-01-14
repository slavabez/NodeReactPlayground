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

    handleFormSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            isProcessing: true
        });
        const postRequest = await axios.post('/api/file', this.state.file);
        console.log('Response from the server:', postRequest);
        this.setState({
            isProcessing: false
        });
    };

    handleFileSelected = (e) => {
        const file = e.target.files[0];
        console.log(file);
        this.setState({
            fileNameSelected: (file.name) ? file.name : ''
        });
        // Read the file info, set the data to component state, then on submit send it off
        const reader = new FileReader();

        reader.onload = (upload) => {
            console.log('Upload:', upload);
            this.setState({
                file: {
                    data_uri: upload.target.result,
                    fileName: file.name,
                    mimeType: file.type
                }
            });
        };

        reader.readAsDataURL(file);
    };

    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input type="file" onChange={this.handleFileSelected} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" value={this.state.fileNameSelected} readOnly />
                    </div>
                </div>
                <button type='submit'>Upload</button>
            </form>
        );
    }
}