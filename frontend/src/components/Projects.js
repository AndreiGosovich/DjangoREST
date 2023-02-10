import React from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'

const ProjectItem = ({item, deleteProject}) => {
	return (
		<tr>
			<td><Link to={'/projects/' + item.id}>{item.id}</Link></td>
			<td>{item.projectName}</td>
			<td>{item.repoLink}</td>
            <td>{item.users}</td>
			<td><button onClick={()=>deleteProject(item.id)}
			type='button'>Удалить</button></td>
		</tr>
	)
}

const ProjectList = ({items, deleteProject}) => {
	const h = useHistory()
	function searchEvent(){
		let searchString =  document.getElementById('search').value
		h.push('/projects/' + searchString)
	}

	let {search} = useParams()
	if (search) {
		items = items.filter((item) => item.id == search || item.projectName.toLowerCase().indexOf(search.toLowerCase()) > -1)
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
					<th>Project name</th>
					<th>Link to repository</th>
					<th>Users</th>
					<th></th>
				</tr>
				{items.map((item) => <ProjectItem item={item} deleteProject={deleteProject} />)}
				</tbody>
			</table>
			<Link to='/project/create'>Создать проект</Link>
		</div>
	)
} 

export default ProjectList