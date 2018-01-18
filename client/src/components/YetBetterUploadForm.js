import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Compressor from 'image-compressor.js';

import FileItem from './FileItem';

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

    handleSetFileDragOver(isDragged = false) { this.setState({fileIsDragged: isDragged}) };
    handleFileSubmit = (e) => { this.addFileToList(e.target.files); };
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

    handleConvertClick = async (e) => {
        const converted = await this.convertFiles(this.state.filesToUpload);
        this.setState({
            filesToUpload: converted
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
                    // Add the unique ID and metadata
                    const convertedFiles = converted.map(
                        (file, index) => {
                            file.uniqueId = this.state.filesToUpload[index].uniqueId;
                            return file;
                        }
                    );
                    resolve(convertedFiles);
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

                <Button
                    className="waves-effect waves-light btn"
                    onClick={this.handleConvertClick}
                >
                    Convert
                </Button>

                <Button className="waves-effect waves-light btn">Button</Button>
                <Button
                    className="waves-effect waves-light btn"
                    onClick={() => { console.log(this.state)}}
                >Show state</Button>

                {this.state.filesToUpload.map(
                    (file) => <FileItem file={file} key={file.uniqueId} />
                )}

            </FormWrapper>
        );
    }
}


export default YetBetterUploadForm;