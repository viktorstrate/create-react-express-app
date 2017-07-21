import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import Comments from '../Comments/Comments'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React with Express</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>client/src/modules/App/App.js</code> and save to reload.
        </p>
        <Comments/>
      </div>
    );
  }
}

export default App;
