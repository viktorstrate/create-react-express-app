import React, { Component } from 'react'
import reactLogo from '../../react.svg'
import expressLogo from '../../express.svg'
import mongodbLogo from '../../mongodb.svg'
import './App.css'
import Comments from '../Comments/Comments'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={expressLogo} className="Express-logo" alt="Express" />
          <img src={reactLogo} className="React-logo" alt="React" />
          <img src={mongodbLogo} className="Mongo-logo" alt="MongoDB" />
          <h2>Welcome to React with Express & MongoDB</h2>
        </div>
        <p className="App-intro">
          <i>To get started, edit <code>client/src/modules/App/App.js</code> and save to reload.</i>
        </p>
        <Comments/>
      </div>
    );
  }
}

export default App;
