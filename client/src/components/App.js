import React from 'react';

// import UploadForm from './UploadForm';
import YetBetterUploadForm from './YetBetterUploadForm';

export default class App extends React.Component {

  handleFullscreenClick = () => {

  };

  render() {
    return (
      <div className='container'>
        <h3 style={{textAlign: 'center'}}>Multi upload form</h3>
        <button onClick={}>Full screen</button>
        <YetBetterUploadForm/>
      </div>
    );
  }
};

