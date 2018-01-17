import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImageCompressor from 'image-compressor.js';
import axios from 'axios';

import { formatBytes } from '../helpers';
import FileItem from './FileItem';
import ProgressBar from './ProgressBar';

const inputFieldStyles = {
    width: '100%',
    height: '10rem',
    position: 'relative',
    zIndex: 10,
    opacity: 0
};
const inputOverlayStyles = (isHighlight = false) => {
    return {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0',
        zIndex: '0',
        outline: '2px dashed black',
        outlineOffset: '-10px',
        backgroundColor: (!isHighlight) ? '#E6E6E6' : '#B7EDAF',
        textAlign: 'center',
        margin: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem'
    };
};

const listStyles = {
    display: 'flex',
    justifyContent: 'space-between'
};
const blobToFile = (theBlob, fileName) => {
    theBlob.lastModified = Date.now();
    theBlob.name = fileName;
    theBlob.originalname = fileName;
    return theBlob;
};

export default class BetterUploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filesSelected: [],
            isHighlighted: false
        };
    }

    handleFilesSelected = (e) => {
        this.addFilesToList(e.target.files);
        this.removeHighlight();
    };

    handleSubmit = async () => {
        // Prepare files for upload by converting from binary images to URLs
        const formData = new FormData();
        // Add all files to the form
        this.state.filesSelected.forEach((file) => {
            formData.append(`files`, file);
        });
        const requestConfig = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        const response = await axios.post('/api/file', formData, requestConfig);
        console.log(response);
    };

    handleConvert = () => {
        const compressor = new ImageCompressor();
        console.log(compressor);
        try {
            const promises = this.state.filesSelected.map(
                 (file) => {
                    return compressor.compress(file, {
                        maxWidth: 500,
                        maxHeight: 500,
                        quality: 0.9
                    });
                }
            );
            let newState;
            Promise.all(promises)
                .then((values) => {
                    newState = values;
                    newState = newState.map((blob) => {
                        return blobToFile(blob, Date.now() + '.jpg');
                    });
                    console.log('New state: ', newState);
                    this.setState({
                        filesSelected: newState
                    });
                });

        } catch (e) {
            console.log('Error happened converting:',e);
        }

    };


    addFilesToList = (files) => {
        // Add new files in addition to the old ones
        this.setState((oldState) => {
            return {filesSelected: oldState.filesSelected.concat(Array.from(files))}
        });
    };
    removeAFile = (name, lastModified) => {
        this.setState(
            (oldState) => {
                return {
                    filesSelected: oldState.filesSelected.filter((file) => {
                        return (file.name !== name) && (file.lastModified !== lastModified);
                    })
                };
            }
        );
    };
    removeAllFiles = () => {
        this.setState({
            filesSelected: []
        });
    };

    addHighlight = () => {
        this.setState({isHighlighted: true});
    };
    removeHighlight = () => {
        this.setState({isHighlighted: false});
    };

    render() {
        const collectionItems = this.state.filesSelected.map(
            (file, index) => {
                return (
                    <FileItem
                        key={`${index}-${Date.now()}`}
                        file={file}
                        removeAFile={this.removeAFile}
                        listStyles={listStyles}
                    />
                );
            }
        );

        // calculate total size in bytes by counting each element's size, starting at 0
        const totalSize = (this.state.filesSelected.length)
            ? this.state.filesSelected.reduce(
                (accumulator, current) => accumulator + current.size, 0
            )
            : 0;

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{position: 'relative'}}>
                    <input
                        style={inputFieldStyles}
                        type="file"
                        accept="image/*"
                        multiple={this.props.isMultiFile}
                        onDragEnter={this.addHighlight}
                        onDragExit={this.removeHighlight}
                        onChange={this.handleFilesSelected}
                    />
                    <div style={inputOverlayStyles(this.state.isHighlighted)}>
                        Click to choose files or drag-n-drop
                    </div>
                </div>
                <ul className="collection">
                    {collectionItems}
                    <li className="collection-item active" style={listStyles}>
                        Total: {this.state.filesSelected.length} file(s), {formatBytes(totalSize)}
                        <i
                            className="material-icons red-text"
                            style={{cursor: 'pointer'}}
                            onClick={this.removeAllFiles}
                        >
                            delete_forever
                        </i>
                    </li>
                </ul>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <a className="waves-effect waves-light btn left-align" onClick={this.handleSubmit}>Submit</a>
                    <a className="waves-effect waves-light btn right-align" type='click' onClick={this.handleConvert}>
                        Convert
                        <i className="material-icons" style={{cursor: 'pointer'}} >
                            photo_size_select_large
                        </i>
                    </a>
                </div>

                <ProgressBar progress={30}/>
            </div>
        );
    };
};

BetterUploadForm.propTypes = {
    isMultiFile: PropTypes.bool
};