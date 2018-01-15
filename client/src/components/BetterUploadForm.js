import React, {Component} from 'react';
import PropTypes from 'prop-types';

const inputFieldStyles = {
    width: '100%',
    height: '10rem',
    position: 'relative',
    zIndex: 10,
    opacity: 0
};
const inputOverlayStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    zIndex: '0',
    outline: '2px dashed black',
    outlineOffset: '-10px',
    backgroundColor: '#e6e6e6',
    textAlign: 'center',
    margin: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem'
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
            filesSelected: []
        };
    }

    handleFilesSelected = (e) => {
        this.addFilesToList(e.target.files);
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
                    <input style={inputFieldStyles} type="file" multiple={this.props.isMultiFile}
                           onChange={this.handleFilesSelected}/>
                    <div style={inputOverlayStyles}>
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
            </div>
        );
    };
};

BetterUploadForm.propTypes = {
    isMultiFile: PropTypes.bool
};