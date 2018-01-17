import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Compressor from 'image-compressor.js';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

const FileInput = styled.input`
    display: flex;
    opacity: 0;
    z-index: 10;
    height: 10rem;
`;

const InputOverlay = styled.div`
    display: flex;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: ${props => props.fileBeingDraggedOver ? '#c1fec1' : '#ecebea'};
`;

class YetBetterUploadForm extends Component {
    constructor(props){
        super();

        this.state = {};
    }

    render(){
        return (
            <Wrapper>
                <FileInput type='file'/>
                <InputOverlay fileBeingDraggedOver>
                    Drag files here or click to select
                </InputOverlay>
            </Wrapper>
        );
    }
}


export default YetBetterUploadForm;