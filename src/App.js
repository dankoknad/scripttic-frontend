import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Navigation from './Navigation';
import ArticlesLinks from './ArticlesLinks';
import Article from './Article';
import Comments from './Comments';
import LogIn from './LogIn';
import SignIn from './SignIn';
import Logout from './Logout';
import Farewell from './Farewell';
import Profile from './Profile';
import Alien from './Alien';
import NewArticleForm from './NewArticleForm';
import MyArticles from './MyArticles';
import MyComments from './MyComments';
import AddCommentForm from './AddCommentForm';
import _ from 'lodash';

import {
	getData,
	baseUrl,
	getToken,
	getLoggedUser,
	logOut,
	submitNewArticle,
	submitNewComment
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
		signInPassVal: 'Pass123!',
		newArticleTitle: '',
		newArticleContent: '',
		newCommentTitle: 'abc',
		newCommentContent: 'def'
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
			body: newCommentContent,
			title: newCommentTitle
		}

		submitNewComment(token, payload, articleId)
			.then(() => {
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
					</div>
					<Navigation 
						loggedUser={loggedUser}
						token={token}
					/>
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

							</div>
						</div>
					</div>
				</div>
			</Router>
    );
  }
}

export default App;
