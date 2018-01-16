import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = (props = {progress: 0}) => {
    return (
        <div className="progress">
            <div className="determinate" style={{
                width: `${props.progress}%`
            }}/>
        </div>
    );
};

ProgressBar.propTypes = {
    progress: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default ProgressBar;