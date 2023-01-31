import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectItem = ({item}) => {
	return (
		<tr>
			<td>{item.id}</td>
			<td>{item.projectName}</td>
			<td>{item.repoLink}</td>
            <td>{item.users}</td>
		</tr>
	)
}

const Project = ({items}) => {
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
            </tr>
            {filter_project.map((item) => <ProjectItem item={item} />)}
            </tbody>
		</table>
	)
}

export default Project