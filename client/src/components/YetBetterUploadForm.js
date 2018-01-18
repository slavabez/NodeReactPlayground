import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Compressor from 'image-compressor.js';

// Importing styled components
import FormWrapper from './styled/FormWrapper';
import FileInput from './styled/FileInput';
import InputOverlay from './styled/InputOverlay';
import Button from './styled/Button';


class YetBetterUploadForm extends Component {
    constructor(props) {
        super();

        this.state = {
            fileIsDragged: false,
            filesToUpload: []
        };
    }

    handleSetFileDragOver(isDragged = false) {
        this.setState({fileIsDragged: isDragged})
    };

    handleFileSubmit = (e) => {
        const files = e.target.files;
        this.setState((oldState) => {
            return {filesToUpload: oldState.filesToUpload.concat(Array.from(files))}
        });
    };

    convertFiles(files) {
        return new Promise((resolve, reject) => {
            const comp = new Compressor();

            const promises = files.map(
                (file) => {
                    return comp.compress(file, {
                        maxWidth: 500,
                        maxHeight: 500,
                        quality: 0.9
                    });
                }
            );
            Promise.all(promises)
                .then(converted => {
                    resolve(converted);
                    console.log(converted);
                })
                .catch((err => {
                    reject(err);
                }))
        });
    };

    render() {
        return (
            <FormWrapper className="container">
                <FileInput
                    type="file"
                    multiple
                    onChange={this.handleFileSubmit}
                    onDragEnter={() => {
                        this.handleSetFileDragOver(true)
                    }}
                    onDragExit={() => {
                        this.handleSetFileDragOver(false)
                    }}/>
                <InputOverlay fileBeingDraggedOver={this.state.fileIsDragged}/>

                <br/>

                <Button className="waves-effect waves-light btn" onClick={() => {
                    this.convertFiles(this.state.filesToUpload)
                }}>Convert
                </Button>

                <br/>

                <Button className="waves-effect waves-light btn">Button</Button>

            </FormWrapper>
        );
    }
}


export default YetBetterUploadForm;