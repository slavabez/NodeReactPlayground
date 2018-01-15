import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import PromiseFileReader from 'promise-file-reader';
import axios from 'axios';

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
        backgroundColor: (!isHighlight) ? '#e6e6e6' : 'rgb(183, 237, 175)',
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

function formatBytes(bytes, decimals) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

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
        /*const results = await Promise.all(
            this.state.filesSelected.map(
                // noinspection BadExpressionStatementJS
                async (file) => {
                    return {
                        data_uri: await PromiseFileReader.readAsDataURL(file),
                        name: file.name,
                        type: file.type,
                        size: file.size
                    };
                }
            )
        );*/
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
                    <li className="collection-item" key={`${index}-${Date.now()}`}>
                        <div style={listStyles}>
                            {file.name} - {formatBytes(file.size)}
                            <i
                                className="material-icons red-text"
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                    this.removeAFile(file.name, file.lastModified)
                                }}
                            >
                                delete
                            </i>
                        </div>
                    </li>
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
            <div>
                <div style={{position: 'relative'}}>
                    <input
                        style={inputFieldStyles}
                        type="file"
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
                        Total: {formatBytes(totalSize)}
                        <i
                            className="material-icons red-text"
                            style={{cursor: 'pointer'}}
                            onClick={this.removeAllFiles}
                        >
                            delete_forever
                        </i>
                    </li>
                </ul>
                <button type='click' onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    };
};

BetterUploadForm.propTypes = {
    isMultiFile: PropTypes.bool
};