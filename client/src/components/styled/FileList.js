import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {formatBytes} from '../../helpers/index';

const List = styled.ul`
    display: flex;
    flex-direction: column;
    position: relative;
`;
const ListItem = styled.li`
    font-size: 1.25rem;
    border-bottom: 1px solid black;
    margin: 0.5rem 0;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
`;

const LoadingOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: #3fdd9a1a;;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FileList = (props) => {
    return (
        <List>
            {props.files.map(
                (file) =>
                    <ListItem key={file.uniqueId}>
                        <div>{file.name} - {formatBytes(file.size)}</div>
                        <div>
                            <i className="material-icons red-text" style={{cursor: 'pointer'}} onClick={() => {props.deleteFile(file.uniqueId)}}>
                                delete
                            </i>
                        </div>
                    </ListItem>
            )}
            {(props.isUploading || props.isConverting) ? <LoadingOverlay>
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"/>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"/>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"/>
                        </div>
                    </div>
                </div>
            </LoadingOverlay> : ''}
        </List>
    );
};

FileList.propTypes = {
    files: PropTypes.array,
    isUploading: PropTypes.bool,
    isConverting: PropTypes.bool,
    deleteFile: PropTypes.func
};

export default FileList;