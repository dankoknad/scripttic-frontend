import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import ArticlesLinks from './ArticlesLinks';
import Article from './Article';
import Comments from './Comments';
import Login from './Login';
import _ from 'lodash';

import {
	getData,
	baseUrl,
	getToken
} from './lib/helpers.js';

import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import './css/index.css';

class App extends Component {
	state = {
		articles: [],
		comments: [],
		loginEmailVal: 'test@scripttic.com',
		loginPassVal: 'Pass123!'
	}

	componentDidMount(){
    getData(baseUrl)
      .then(articles => {
				this.setState({articles});

				_.forEach(articles, article => {
						getData(`${baseUrl}/${article.id}/comment`)
							.then(comments => {
								comments.length > 0 && this.setState({
									comments: [...this.state.comments, ...comments]
								})
							})
				})

			})
  }

	handleSubmitLogin = (e) => {
		e.preventDefault();

		const formData = "grant_type=Bearer&email=test%40scripttic.com&password=Pass123!";
		const formDataB = {
			"grant_type": "Bearer",
			"email": "test@scripttic.com",
			"password": "Pass123!"
		};
		const formDataC = {
			grant_type: "Bearer",
			email: "test@scripttic.com",
			password: "Pass123!"
		};

		
		fetch('http://www.scripttic.com:8000/oauth2/token', {
			method: "POST",
			headers: {
        'Accept': 'application/x-www-form-urlencoded',
      	'Content-Type': 'application/x-www-form-urlencoded'
			},
			// body: data
			body: formData
			// body: JSON.stringify(formData)
		}).then(res => res.json())

		// console.log(formData);
	}

	handleLoginEmailVal = (e) => {
		e.preventDefault();
		
		// console.log(e.target.value);
		this.setState({loginEmailVal: e.target.value.trim()});
	}
	
	handleLoginPassVal = (e) => {
		e.preventDefault();
		
		// console.log(e.target.value);
		this.setState({loginPassVal: e.target.value.trim()});
	}

  render() {
		const {articles, comments, loginEmailVal, loginPassVal} = this.state;

    return (
			<Router>
				<div className="App">
					<div className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h3>Hello Scripttic</h3>
					</div>
					<Navbar inverse collapseOnSelect>
						<Navbar.Header>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav pullRight>
								<LinkContainer to="/" exact activeClassName="active">
									<NavItem eventKey={2} href="#">Articles</NavItem>
								</LinkContainer>
								<LinkContainer to="/login" activeClassName="active">
									<NavItem eventKey={2} href="#">Login</NavItem>
								</LinkContainer>
								<NavDropdown eventKey={3} title="Dropdown to nowhere" id="basic-nav-dropdown">
									<MenuItem eventKey={3.1}>Action</MenuItem>
									<MenuItem eventKey={3.2}>Another action</MenuItem>
									<MenuItem eventKey={3.3}>Something else here</MenuItem>
									<MenuItem divider />
									<MenuItem eventKey={3.4}>Separated link</MenuItem>
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>	
					</Navbar>
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<Route exact path="/" render={() => (
                	<ArticlesLinks articles={articles} />
									)}
								/>

								{	(articles.length) 
									? <Route path="/article/:articleId" render={({match}) => {
											const article = _.find(articles, (o) => o.id === Number(match.params.articleId) );
											return (
												<Article article={article} >
													<Comments comments={_.filter(comments, (o) => o.article === article.id )}/>
												</Article>	
											)
										}} />
									: null
								}

								<Route path="/login" render={() => (
										<Login
											handleSubmitLogin={this.handleSubmitLogin}
											loginEmailVal={loginEmailVal}
											loginPassVal={loginPassVal}
											handleLoginEmailVal={this.handleLoginEmailVal}
											handleLoginPassVal={this.handleLoginPassVal}
										/>
									)}
								/>

							</div>
						</div>
					</div>
				</div>
			</Router>
    );
  }
}

export default App;
