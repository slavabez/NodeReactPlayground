import React from 'react';

import UploadForm from './UploadForm';

export default class App extends React.Component {

    render(){
        return (
            <div className='container'>
                <h2>Upload form test</h2>
                <UploadForm />
            </div>
        );
    }
};

