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
import NewArticleForm from './NewArticleForm';
import MyArticles from './MyArticles';
import MyComments from './MyComments';
import _ from 'lodash';

import {
	getData,
	baseUrl,
	getToken,
	getLoggedUser,
	logOut,
	submitNewArticle
} from './lib/helpers.js';

import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import './css/index.css';

class App extends Component {
	state = {
		articles: [],
		comments: [],
		loginEmailVal: 'dankomilutinovic@gmail.com',
		loginPassVal: 'Pass123!',
		token: '',
		loggedUser: {},
		signInFirstName: '',
		signInLastName: '',
		signInEmailVal: '',
		signInPassVal: '',
		newArticleTitle: '',
		newArticleContent: ''
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
	
			// log myself when app start
			const {loginEmailVal, loginPassVal} = this.state;
			const formData = `grant_type=Bearer&email=${loginEmailVal}&password=${loginPassVal}`;

			getToken('http://www.scripttic.com:8000/oauth2/token', formData)
			.then(token => {
				this.setState({token});
				console.log(token);

					getLoggedUser(token)
						.then(user => this.setState({loggedUser: user}))
			})
			// remove section above later
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

	// sign in
	handleRegistrationInputs = (e) => {
		e.preventDefault();
		
		this.setState({[e.target.name]: e.target.value})
	}

	handleSubmitRegistration = (e) => {
		e.preventDefault();
		const {signInFirstName, signInLastName, signInEmailVal, signInPassVal} = this.state;

		const newUser = {
			email: signInEmailVal,
			pass: signInPassVal,
			firstName: signInFirstName,
			lastName: signInLastName
		}

		fetch('http://www.scripttic.com:8000/api/v1/user', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		}).then(res => res.json())
		.then(d => { console.log(d)})
		// console.log(newUser);

		// registration(newUser)
		// 	.then(() => {
		// 		this.setState({
		// 			signInFirstName: '',
		// 			signInLastName: '',
		// 			signInEmailVal: '',
		// 			signInPassVal: ''
		// 		})
		// 		console.log('registration success');
		// 	})

	}

	// add new article
	handleNewArticleInputs = (e) => {
		e.preventDefault();
		
		this.setState({[e.target.name]: e.target.value.replace(/\s+/g, ' ')})
	}

	postNewArticle = (e) => {
		e.preventDefault();
		const {token, newArticleTitle, newArticleContent, loggedUser} = this.state;
		const payload = {
			poster: loggedUser.id,
			body: newArticleContent,
			title: newArticleTitle
		}

		submitNewArticle(token, payload)
			.then(() => {
				getData(baseUrl)
					.then(articles => {
						this.setState({
							articles,
							newArticleTitle: '',
							newArticleContent: ''
						});
					})
			})

	}

  render() {
		const {articles, comments, loginEmailVal, loginPassVal, loggedUser, token, signInFirstName, signInLastName, signInEmailVal, signInPassVal, newArticleTitle, newArticleContent} = this.state;

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
												<SignIn
													handleRegistrationInputs={this.handleRegistrationInputs}
													handleSubmitRegistration={this.handleSubmitRegistration}
													signInFirstName={signInFirstName}
													signInLastName={signInLastName}
													signInEmailVal={signInEmailVal}
													signInPassVal={signInPassVal}
												/>
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
										<Profile loggedUser={loggedUser}>
											<NewArticleForm
												newArticleTitle={newArticleTitle}
												newArticleContent={newArticleContent}
												handleNewArticleInputs={this.handleNewArticleInputs}
												postNewArticle={this.postNewArticle}
											/>
											<MyArticles
												articles={_.filter(articles, (o) => o.poster === loggedUser.id )}
											/>
											<MyComments />
										</Profile>
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
