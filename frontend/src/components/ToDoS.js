import React from 'react'

const ToDoItem = ({item}) => {
	return (
		<tr>
			<td>{item.id}</td>
			<td>{item.project.projectName}</td>
			<td>{item.description}</td>
            <td>{item.created}</td>
			<td>{item.updated}</td>
            <td>{item.user}</td>
			<td>{String(item.closed)}</td>
		</tr>
	)
} 

const ToDoList = ({items}) => {
	return (
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
			</tr>
			{items.map((item) => <ToDoItem item={item} />)}
            </tbody>
		</table>
	)
} 

export default ToDoList