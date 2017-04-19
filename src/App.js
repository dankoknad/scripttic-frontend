import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import ArticlesLinks from './ArticlesLinks';
import Article from './Article';
import _ from 'lodash';

import {
	getData,
	baseUrl
} from './lib/helpers.js';

import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import './css/index.css';

class App extends Component {
	state = {
		articles: [],
		comments: []
	}

	componentDidMount(){
    getData(baseUrl)
      .then(articles => {
				this.setState({articles});

				_.forEach(articles, article => {
						getData(`${baseUrl}/${article.id}/comment`)
							.then(comment => {
								comment.length > 0 && this.setState({
									comments: [...this.state.comments, comment[0]]
								})
							})
				})
				
			})
  }

  render() {
		const {articles} = this.state;

    return (
			<Router>
				<div className="App">
					<div className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h3>Hello Scripttic</h3>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<Route exact path="/" render={() => (
                	<ArticlesLinks articles={articles} />
									)}
								/>

								{	(articles.length) 
									? <Route path="/article/:articleId" render={({match}) => {
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