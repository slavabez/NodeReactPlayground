import React from 'react';
import PropTypes from 'prop-types';
import {formatBytes} from "../helpers";

const FileItem = (props) => {

    return (
        <li className="collection-item">
            <div style={props.listStyles}>
                {props.file.name} - {formatBytes(props.file.size)}
                <i
                    className="material-icons red-text"
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                        props.removeAFile(props.file.name, props.file.lastModified)
                    }}
                >
                    delete
                </i>
            </div>
        </li>
    );
};

FileItem.propTypes = {
    file: PropTypes.object,
    removeAFile: PropTypes.func,
    listStyles: PropTypes.object
};

export default FileItem;