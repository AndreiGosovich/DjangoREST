import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectItem = ({item, deleteProject}) => {
	return (
		<tr>
			<td>{item.id}</td>
			<td>{item.projectName}</td>
			<td>{item.repoLink}</td>
            <td>{item.users}</td>
            <td><button onClick={()=>deleteProject(item.id)}
			type='button'>Удалить</button></td>
		</tr>
	)
}

const Project = ({items, deleteProject}) => {
    let {id} = useParams()
    let filter_project = items.filter((item) => item.id == id)
	return (
		<table>
            <tbody>
            <tr>
                <th>ID</th>
                <th>Project name</th>
                <th>Link to repository</th>
                <th>Users</th>
                <th></th>
            </tr>
            {filter_project.map((item) => <ProjectItem item={item} deleteProject={deleteProject}/>)}
            </tbody>
		</table>
	)
}

export default Project