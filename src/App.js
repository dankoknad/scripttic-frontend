import React, { Component } from 'react';
import _ from 'lodash';

import {
	loadArticles,
	baseUrl
} from './lib/helpers.js';

import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import './css/index.css';

class App extends Component {
	state = {
		articles: []
	}

	componentDidMount(){
    loadArticles(baseUrl)
      .then(data => {
			  const ordered =	_.orderBy(data, (o) => o.id, 'desc' );
				this.setState({articles: ordered})
			})    
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello Scripttic</h2>
        </div>
        <div className="container">
					<div className="row">
						<div className="col-sm-4">
							<h3>Articles:</h3>
							{this.state.articles.length
								? this.state.articles.map(article => <div key={article.id}>{article.title}</div>)
								: null
							}
						</div>
						<div className="col-sm-4">col no 02</div>
						<div className="col-sm-4">col no 03</div>
					</div>
				</div>
      </div>
    );
  }
}

export default App;
