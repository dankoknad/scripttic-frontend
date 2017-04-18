import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import './css/index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello Scripttic</h2>
        </div>
        <div className="container">
					<div className="row">
						<div className="col-sm-4">col no 01</div>
						<div className="col-sm-4">col no 02</div>
						<div className="col-sm-4">col no 03</div>
					</div>
				</div>
      </div>
    );
  }
}

export default App;
