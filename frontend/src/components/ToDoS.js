import React from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'

const ToDoItem = ({item, deleteToDo}) => {
	return (
		<tr>
			<td>{item.id}</td>
			<td>{item.project.projectName}</td>
			<td>{item.description}</td>
            <td>{item.created}</td>
			<td>{item.updated}</td>
            <td>{item.user.username}</td>
			<td>{String(item.closed)}</td>
			<td><button onClick={()=>deleteToDo(item.id)}
			type='button'>Удалить</button></td>
		</tr>
	)
} 

const ToDoList = ({items, deleteToDo}) => {
	const h = useHistory()
	function searchEvent(){
		let searchString =  document.getElementById('search').value
		h.push('/todos/' + searchString)
	}

	let {search} = useParams()
	if (search) {
		items = items.filter((item) => item.project.projectName.toLowerCase().indexOf(search.toLowerCase()) > -1)
	}

	return (
		<div>
			<label for='search'>Название проекта</label>
				<input type='text' name='search' id='search'>
				</input>
			{<button type="button" onClick={searchEvent}>
				Найти
			</button>}

			<table>
				<tbody>
				<tr>
					<th>ID</th>
					<th>Project</th>
					<th>Description</th>
					<th>Created</th>
					<th>Updated</th>
					<th>User</th>
					<th>Closed</th>
					<th></th>
				</tr>
				{items.map((item) => <ToDoItem item={item} deleteToDo={deleteToDo}/>)}
				</tbody>
				<Link to='/todos/create'>Создать записку</Link>
			</table>
		</div>
	)
} 

export default ToDoList