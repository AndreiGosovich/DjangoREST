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
import ProjectForm from './components/ProjectForm';
import ToDoForm from './components/ToDoForm';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

const SERVER_IP = "http://127.0.0.1:8000"
 
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
		this.set_current_user('')	
	}

	get_token_from_storage() {
		const cookies = new Cookies()
		const token = cookies.get('token')
		this.setState({'token': token}, ()=>this.load_data())
	}

	set_current_user(username) {
		const cookies = new Cookies()
		cookies.set('currentUser', username)
		this.setState({'currentUser': username})
	}

	get_current_user_from_storage() {
		const cookies = new Cookies()
		const currentUser = cookies.get('currentUser')
		this.setState({'currentUser': currentUser}, ()=>this.load_data())
	}

	get_token(username, password) {
		axios.post(SERVER_IP + '/api/token/', {username: username, password: password})
			.then(response => {
				this.set_token(response.data['access'])
				this.set_current_user(username)
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
		axios.get(SERVER_IP + '/api/users/', {headers})
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

		axios.get(SERVER_IP + '/api/projects/', {headers})
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

		axios.get(SERVER_IP + '/api/todo/', {headers})
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

	createProject(project_name, repo_link) {
		const headers = this.get_headers()
		const data = {projectName: project_name, repoLink: repo_link, users: []}
		
		axios.post(SERVER_IP + `/api/projects/`, data, {headers})
			.then(response => {
				let new_project = response.data
				this.setState({'projects': [...this.state.projects, new_project]})
			}).catch(error => console.log(error))
	}

	deleteProject(id){
		const headers = this.get_headers()
		axios.delete(SERVER_IP + `/api/projects/${id}`, {headers})
			.then(response => {
				this.setState({'projects': this.state.projects.filter((item)=>item.id !== id)})
			}).catch(error => console.log(error))
	}

	deleteToDo(id){
		const headers = this.get_headers()
		axios.delete(SERVER_IP + `/api/todo/${id}`, {headers})
			.then(response => {
				this.setState({'todos': this.state.todos.filter((item)=>item.id !== id)})
			}).catch(error => console.log(error))
	}

	createToDo(description, project, user) {
		const headers = this.get_headers()
		const data = {description: description, project: project, user: user}
		axios.post(SERVER_IP + `/api/todo/`, data, {headers})
			.then(response => {
				let new_todo = response.data
				const project = this.state.projects.filter((item) => item.id === new_todo.project)[0]
				new_todo.project = project
				const user = this.state.users.filter((item) => item.id === new_todo.user)[0]
				new_todo.user = user
				this.setState({'todos': [...this.state.todos, new_todo]})
			}).catch(error => console.log(error))
	}

	componentDidMount() {
		this.get_token_from_storage()
		this.get_current_user_from_storage()
	} 
	
	render () {
		return (
			<div className='mainApp'>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"></link>
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
				<Router>
					<Menu 
						is_authenticated={this.is_authenticated()} 
						logout={() => {this.logout()}}
						currentUser={this.state.currentUser}
					/>

					<Switch>
						<Route exact path='/' component={() => <ProjectList items={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} />} />
						<Route exact path='/users' component={() => <UserList users={this.state.users} />} />
						<Route exact path='/todos' component={() => <ToDoList items={this.state.todos} deleteToDo={(id)=>this.deleteToDo(id)} />} />
						<Route exact path='/todos/create' component={() => <ToDoForm users={this.state.users} projects={this.state.projects} createToDo={(description, project, user) => this.createToDo(description, project, user)} />} />
						<Route exact path='/todos/:search' component={() => <ToDoList items={this.state.todos} deleteToDo={(id)=>this.deleteToDo(id)} />} />
						<Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
						<Route exact path='/projects/create' component={() => <ProjectForm createProject={(project_name, repo_link) => this.createProject(project_name, repo_link)} />} />
						<Route exact path='/projects/:search' component={() => <ProjectList items={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} />} />
						{/* <Route exact path='/projects/:id' component={() => <Project items={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} />} /> */}
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