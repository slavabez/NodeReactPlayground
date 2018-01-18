import React from 'react';
import styled from 'styled-components';


const InputOverlayStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    position: absolute;
    outline: 2px dashed black;
    outline-offset: -0.5rem;
    z-index: 1;
    width: 100%;
    height: 12.5rem;
    background-color: ${props => props.fileBeingDraggedOver ? '#c1fec1' : '#ecebea'};
`;

export default (props) => {
    return (
        <InputOverlayStyle fileBeingDraggedOver={props.fileBeingDraggedOver}>
            <i className="material-icons" style={{fontSize: '5rem'}}>file_upload</i>
            <p style={{fontSize: '1.25rem'}}>Click to add files or drag-n-drop here</p>
        </InputOverlayStyle>);
};