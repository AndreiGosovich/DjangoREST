import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import ProjectList from './components/Projects.js'
import ToDoList from './components/ToDoS'
import Project from './components/Project'
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

 
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
			'todos': []
		}
	} 

	componentDidMount() {
		axios.get('http://127.0.0.1:8000/api/users/')
			.then(response => {
				const users = response.data.results
				this.setState(
					{
						'users': users
					}
				)
			}).catch(error => console.log(error));

		axios.get('http://127.0.0.1:8000/api/projects/')
			.then(response => {
				const projects = response.data.results
				this.setState(
					{
						'projects': projects
					}
				)
			}).catch(error => console.log(error));

		axios.get('http://127.0.0.1:8000/api/todo/')
			.then(response => {
				const todos = response.data.results
				this.setState(
					{
						'todos': todos
					}
				)
			}).catch(error => console.log(error))
	}
	
	render () {
		return (
			<div className='mainApp'>
				<Router>
					<Menu />

					<Switch>
						<Route exact path='/' component={() => <ProjectList items={this.state.projects} />} />
						<Route exact path='/users' component={() => <UserList users={this.state.users} />} />
						<Route exact path='/todos' component={() => <ToDoList items={this.state.todos} />} />
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