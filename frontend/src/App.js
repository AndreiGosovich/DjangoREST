import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import ProjectList from './components/Projects.js'
import ToDoList from './components/ToDoS'
import Project from './components/Project'
import LoginForm from './components/Auth';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

 
const NotFound404 = ({ location }) => {
	return (
		<div>
			<h1>Страница по адресу '{location.pathname}' не найдена</h1>
		</div>
	)
} 

class App extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			'users': [],
			'projects': [],
			'todos': [],
			'token': '',
			'currentUser': ''
		}
	}

	set_token(token) {
		const cookies = new Cookies()
		cookies.set('token', token)
		this.setState({'token': token}, ()=>this.load_data())
	} 

	is_authenticated() {
		return this.state.token != ''
	}

	logout() {
		this.set_token('')
		this.setState({'currentUser': ''})	
	}

	get_token_from_storage() {
		const cookies = new Cookies()
		const token = cookies.get('token')
		this.setState({'token': token}, ()=>this.load_data())
	}

	get_token(username, password) {
		axios.post('http://127.0.0.1:8000/api/token/', {username: username, password: password})
			.then(response => {
				this.set_token(response.data['access'])
				this.setState({'currentUser': username})
			}).catch(error => alert('Неверный логин или пароль'))
	} 

	get_headers() {
		let headers = {
			'Content-Type': 'application/json'
		}
		if (this.is_authenticated())
		{
			headers['Authorization'] = 'Bearer ' + this.state.token
		}
		return headers
	} 

	load_data() {
		const headers = this.get_headers()
		axios.get('http://127.0.0.1:8000/api/users/', {headers})
			.then(response => {
				const users = response.data.results
				this.setState(
					{
						'users': users
					}
				)
			}).catch(error => {
				console.log(error)
				this.setState({'users': []})
			});

		axios.get('http://127.0.0.1:8000/api/projects/', {headers})
			.then(response => {
				const projects = response.data.results
				this.setState(
					{
						'projects': projects
					}
				)
			}).catch(error => {
				console.log(error)
				this.setState({'projects': []})
			});

		axios.get('http://127.0.0.1:8000/api/todo/', {headers})
			.then(response => {
				const todos = response.data.results
				this.setState(
					{
						'todos': todos
					}
				)
			}).catch(error => {
				console.log(error)
				this.setState({'todos': []})
			})
	} 

	componentDidMount() {
		this.get_token_from_storage()
	} 
	
	render () {
		return (
			<div className='mainApp'>
				<Router>
					<Menu 
						is_authenticated={this.is_authenticated()} 
						logout={() => {this.logout()}}
						currentUser={this.state.currentUser}
					/>

					<Switch>
						<Route exact path='/' component={() => <ProjectList items={this.state.projects} />} />
						<Route exact path='/users' component={() => <UserList users={this.state.users} />} />
						<Route exact path='/todos' component={() => <ToDoList items={this.state.todos} />} />
						<Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
						<Route exact path='/projects/:id' component={() => <Project items={this.state.projects} />} />
						<Redirect from='/projects' to='/' />
						<Route component={NotFound404} />
					</Switch>

					<Footer/>
				</Router>
			</div>
		)
	}
}

export default App;