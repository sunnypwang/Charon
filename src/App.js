import React, { Component } from 'react';
import Run from './run'

class App extends Component {


  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>
        <Run />
        <script src="lib/js/jquery-3.2.1.min.js"></script>
        <script src="lib/js/dictate.js"></script>
        <script src="lib/js/recorder.js"></script>
        <script src="lib/js/responsivevoice.js"></script>
      </div>
    );
  }
}

export default App;
