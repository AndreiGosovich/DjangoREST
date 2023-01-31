import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({item}) => {
	return (
		<tr>
			<td><Link to={'/projects/' + item.id}>{item.id}</Link></td>
			<td>{item.projectName}</td>
			<td>{item.repoLink}</td>
            <td>{item.users}</td>
		</tr>
	)
}

const ProjectList = ({items}) => {
	return (
		<table>
            <tbody>
            <tr>
                <th>ID</th>
                <th>Project name</th>
                <th>Link to repository</th>
                <th>Users</th>
            </tr>
            {items.map((item) => <ProjectItem item={item} />)}
            </tbody>
		</table>
	)
} 

export default ProjectList