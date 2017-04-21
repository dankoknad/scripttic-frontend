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
import LogIn from './LogIn';
import SignIn from './SignIn';
import Logout from './Logout';
import Farewell from './Farewell';
import Profile from './Profile';
import _ from 'lodash';

import {
	getData,
	baseUrl,
	getToken,
	getLoggedUser,
	logOut
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
		loginPassVal: 'Pass123!',
		token: '',
		loggedUser: {}
	}

	// get initial data
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

	// login
	handleSubmitLogin = (e) => {
		e.preventDefault();

		const {loginEmailVal, loginPassVal} = this.state;
		const formData = `grant_type=Bearer&email=${loginEmailVal}&password=${loginPassVal}`;
		
		getToken('http://www.scripttic.com:8000/oauth2/token', formData)
			.then(token => {
				this.setState({token});
				console.log(token);

					getLoggedUser(token)
						.then(user => this.setState({loggedUser: user}))
			})
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

	// log out
	handleLogout = (e) => {
		e.preventDefault();
		const {token} = this.state;

		logOut(token)
			.catch((error) => {
        this.setState({
					token: '',
					loggedUser: {}
				})
    });
	}

  render() {
		const {articles, comments, loginEmailVal, loginPassVal, loggedUser, token} = this.state;

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
							{(loggedUser.firstName && token.length === 36) && 
								<LinkContainer to="/profile" exact activeClassName="active">
										<NavItem eventKey={2} href="#">
									<Navbar.Brand>
											Hello {loggedUser.firstName}
									</Navbar.Brand>
											</NavItem>
								</LinkContainer>
							}
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav pullRight>
								<LinkContainer to="/" exact activeClassName="active">
									<NavItem eventKey={2} href="#">Articles</NavItem>
								</LinkContainer>
								{(token.length !== 36)
									?	<LinkContainer to="/login" activeClassName="active">
											<NavItem eventKey={2} href="#">Log in</NavItem>
										</LinkContainer>
									:	<LinkContainer to="/logout" activeClassName="active">
											<NavItem eventKey={2} href="#">Log out</NavItem>
										</LinkContainer>
								}
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
									(token.length !== 36)
										? <LogIn
												handleSubmitLogin={this.handleSubmitLogin}
												loginEmailVal={loginEmailVal}
												loginPassVal={loginPassVal}
												handleLoginEmailVal={this.handleLoginEmailVal}
												handleLoginPassVal={this.handleLoginPassVal}
												token={token}
											>
												<SignIn />
											</LogIn>
										: <h3 className="text-info">Success! Now you are logged.</h3>
									)}
								/>

								<Route path="/logout" render={() => (
										(token.length === 36)
											? <Logout handleLogout={this.handleLogout}/>
											: <Farewell />
									)}
								/>

								<Route exact path="/profile" render={() => (
										<Profile loggedUser={loggedUser} />
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
