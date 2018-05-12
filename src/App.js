import React, { Component } from 'react';
import Run from './run'
import RandomText from './TextScreen';
import './App.css';


class App extends Component {


  render() {
    return (
      <div className="App" style={{display:'flex',flex:1,flexDirection:'column'}}>
        <div className="App-header" style={{flex:5,justifyContent:'center',alignItems:'center'}}>
          <h1 className="App-title" style={{top:'30%'}}>Cha Ron</h1>
        </div>
        <RandomText/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>
        <script src="lib/js/jquery-3.2.1.min.js"></script>
        <script src="lib/js/dictate.js"></script>
        <script src="lib/js/recorder.js"></script>
        <script src="lib/js/responsivevoice.js"></script>
      </div>
    );
  }
}

export default App;
