import React from 'react';

// import UploadForm from './UploadForm';
import BetterUploadForm from './BetterUploadForm';

export default class App extends React.Component {

    render(){
        return (
            <div className='container'>
                <h3 style={{textAlign: 'center'}}>Multi upload form</h3>
                <BetterUploadForm isMultiFile />
            </div>
        );
    }
};

