import React, {Component} from 'react';
import axios from 'axios';

export default class UploadForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUploading: false,
            currentProgress: 0,
            maxProgress: null
        };
    }

    handleFileSelected = (e) => {
        const _this = this;
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onload = async (e) => {
            _this.setState({
                isUploading: true
            });
            const config = {
                onUploadProgress: progressEvent => {
                    _this.setState({
                        currentProgress: progressEvent.loaded,
                        maxProgress: progressEvent.total
                    });
                }
            };
            const response = await axios.post('/api/file', e.target.result, config);
            _this.setState({
                isUploading: false
            });
        };

        reader.readAsDataURL(file);
    };

    render() {

        const progress = (this.state.isUploading) ?
            <progress value={this.state.currentProgress} max={this.state.maxProgress}/> :
            <span>Choose a file to upload</span>;

        return (
            <div className="file-field input-field">
                {!this.state.isUploading ? (
                    <div className="btn">
                        <span>File</span>
                        <input type="file" onChange={this.handleFileSelected}/>
                    </div>
                ) : ('')}

                {progress}
            </div>
        );
    }
}