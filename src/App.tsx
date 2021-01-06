import React from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader'

class App extends React.Component<{}, {}> {
  render(){
    return (
      <>
      <input type="checkbox" className="darkMode" id="darkMode" style={{display: 'none'}} />
      <div className="App">
        <ImageUploader />
      </div>
      </>
    );
  }
}

export default App;
