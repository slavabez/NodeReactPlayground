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
    constructor() {
        super();

        this.state = {
            fileIsDragged: false,
            filesToUpload: [],
            originalMetadata: [],
            convertedMetadata: []
        };
    }

    handleSetFileDragOver(isDragged = false) {
        this.setState({fileIsDragged: isDragged})
    };

    handleFileSubmit = (e) => {
        const files = e.target.files;
        this.addFileToList(files);
    };

    addFileToList = (files) => {
        let allFiles = this.state.filesToUpload.concat(Array.from(files));
        // Add a unique key for lookup to each file
        allFiles = allFiles.map(file => {
            if (!file.uniqueId) {
                file.uniqueId = Math.random();
            }
            return file;
        });
        const metadata = allFiles.map(
            (file) => {
                return {
                    name: file.name,
                    size: file.size,
                    uniqueId: file.uniqueId
                };
            });

        this.setState({
            filesToUpload: allFiles,
            originalMetadata: metadata
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

                <Button className="waves-effect waves-light btn" onClick={() => {
                    this.convertFiles(this.state.filesToUpload)
                }}>Convert
                </Button>

                <Button className="waves-effect waves-light btn">Button</Button>
                <Button
                    className="waves-effect waves-light btn"
                    onClick={() => { console.log(this.state)}}
                >Show state</Button>

            </FormWrapper>
        );
    }
}


export default YetBetterUploadForm;