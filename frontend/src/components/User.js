import React from 'react'

const UserItem = ({user}) => {
	return (
		<tr>
            <td>
				{user.username}
			</td>
			<td>
				{user.firstName}
			</td>
			<td>
				{user.lastName}
			</td>
			<td>
				{user.email}
			</td>
		</tr>
	)
}

const UserList = ({users}) => {
	return (
	<table>
		<tbody>
		<tr>
			<th>
				Username
			</th>
			<th>
				First name
			</th>
			<th>
				Last Name
			</th>
			<th>
				Email
			</th>
		</tr>
		{users.map((user) => <UserItem user={user} />)}
		</tbody>
	</table>
	)
} 
export default UserList