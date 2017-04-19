import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import ArticlesLinks from './ArticlesLinks';
import Article from './Article';
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
      .then(articles => {
			  // const ordered =	_.orderBy(data, (o) => o.id, 'desc' );
				this.setState({articles})
			})    
  }

  render() {
		const {articles} = this.state;

    return (
			<Router>
				<div className="App">
					<div className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h2>Hello Scripttic</h2>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<Route exact path="/" render={() => (
                	<ArticlesLinks articles={articles} />
									)}
								/>

								{	(articles.length) 
									? <Route path="/:articleId" render={({match}) => {
											return (
												<Article article={_.find(articles, (o) => o.id == match.params.articleId )} />
											)
										}} />
									: null
								}

							</div>
						</div>
					</div>
				</div>
			</Router>
    );
  }
}

export default App;

/*
{this.state.articles.length
	? this.state.articles.map(article => <div key={article.id}>{article.title}</div>)
	: null
}
*/