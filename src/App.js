import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
	Switch
} from 'react-router-dom';

import Navigation from './pages/nav/Navigation';
import ArticlesLinks from './pages/articles/ArticlesLinks';
import Article from './pages/articles/Article';
import Comments from './pages/comments/Comments';
import LogIn from './pages/login/LogIn';
import SignIn from './pages/login/SignIn';
import Logout from './pages/login/Logout';
import Farewell from './pages/login/Farewell';
import Profile from './pages/admin/Profile';
import Alien from './pages/404/Alien';
import NoMatch from './pages/404/NoMatch';
import NewArticleForm from './pages/admin/NewArticleForm';
import MyArticles from './pages/admin/MyArticles';
import MyComments from './pages/admin/MyComments';
import AddCommentForm from './AddCommentForm';
import _ from 'lodash';

import {
	getData,
	baseUrl,
	getToken,
	getLoggedUser,
	logOut,
	registration,
	submitNewArticle,
	submitNewComment
} from './lib/helpers.js';

import 'bootstrap/dist/css/bootstrap.css';
import logo from './img/logo.svg';
import './css/App.css';
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
		newArticleContent: '',
		newCommentTitle: 'Some title',
		newCommentContent: 'Soome content'
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
	
			// log myself when app start (development)
			// const {loginEmailVal, loginPassVal} = this.state;
			// const formData = `grant_type=Bearer&email=${loginEmailVal}&password=${loginPassVal}`;

			// getToken('http://www.scripttic.com:8000/oauth2/token', formData)
			// .then(token => {
			// 	this.setState({token});

			// 		getLoggedUser(token)
			// 			.then(user => this.setState({loggedUser: user}))
			// })
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
		
		const formData = `grant_type=Bearer&email=${signInEmailVal}&password=${signInPassVal}`;
		
		registration(newUser)		
			.then(() => {		
				getToken('http://www.scripttic.com:8000/oauth2/token', formData)
					.then(token => {
						this.setState({
							token,
							signInFirstName: '',
							signInLastName: '',
							signInEmailVal: '',
							signInPassVal: ''
						});

						getLoggedUser(token)
							.then(user => this.setState({loggedUser: user}))
					})				
			})
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

	// add new comment
	handleNewCommentInputs = (e) => {
		e.preventDefault();
		
		this.setState({[e.target.name]: e.target.value.replace(/\s+/g, ' ')})
	}
	
	postNewComment = (e, articleId) => {
		e.preventDefault();
		const {token, newCommentTitle, newCommentContent, loggedUser} = this.state;
		const payload = {
			poster: loggedUser.id,
			title: newCommentTitle,
			body: newCommentContent
		}

		submitNewComment(token, payload, articleId)
			.then((d) => {
				console.log(d)

				getData(`${baseUrl}/${articleId}/comment`)
					.then(comments => {
						this.setState({
							comments,
							newCommentTitle: '',
							newCommentContent: ''
						})
					})				
			})
	}

  render() {
		const {articles, comments, loginEmailVal, loginPassVal, loggedUser, token, signInFirstName, signInLastName, signInEmailVal, signInPassVal, newArticleTitle, newArticleContent, newCommentTitle, newCommentContent} = this.state;

    return (
			<Router>
				<div className="App">
					<div className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h3>Hello Scripttic</h3>
						<div className="author">Made with <span className="text-danger">♥</span> by <a href="http://dankoknad.github.io/" target="_blank">Danko</a></div>
					</div>
					<Navigation 
						loggedUser={loggedUser}
						token={token}
					/>
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<Switch>
									<Route exact path="/" render={() => (
										<ArticlesLinks articles={articles} />
										)}
									/>

									{	(articles.length) 
										? <Route path="/article/:articleId" render={({match}) => {
												const article = _.find(articles, (o) => o.id === Number(match.params.articleId) );
												return (
													<Article article={article} >
														{(loggedUser.id) && 
															<AddCommentForm
																newCommentTitle={newCommentTitle}
																newCommentContent={newCommentContent}
																handleNewCommentInputs={this.handleNewCommentInputs}
																postNewComment={this.postNewComment}
																articleId={article.id}
															/>
														}
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
										loggedUser.id
											? (<Profile loggedUser={loggedUser}>
													<NewArticleForm
														newArticleTitle={newArticleTitle}
														newArticleContent={newArticleContent}
														handleNewArticleInputs={this.handleNewArticleInputs}
														postNewArticle={this.postNewArticle}
													/>
													<MyArticles
														articles={_.filter(articles, (o) => o.poster === loggedUser.id )}
													/>
													<MyComments
														comments={_.filter(comments, (o) => o.poster === loggedUser.id )}
													/>
												</Profile>)
											: <Alien />
										)}
									/>

									<Route component={NoMatch}/>
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</Router>
    );
  }
}

export default App;
