import React from 'react'

class ToDoForm extends React.Component {
    constructor(props) {
		super(props)
		this.state = {description: '', project: '', user: ''}
	} 
	
	handleChange(event)
	{
		this.setState(
			{
				[event.target.name]: event.target.value
			}
		);
	} 
	
	handleSubmit(event) {
		this.props.createToDo(this.state.description, this.state.project, this.state.user)
		event.preventDefault()
	}
	
	render() {
		return (
			<form onSubmit={(event)=> this.handleSubmit(event)}>
				<div className="form-group">
					<label for="description">Заметка</label>
					<input type="textArea" className="form-control" name="description"
					value={this.state.description} onChange={(event)=>this.handleChange(event)} />
				</div>
				<div className="form-group">
					<label for="project">Проект</label>
						<select name="project" className='form-control' onChange={(event)=>this.handleChange(event)}>
                            <option value=''></option>
							{this.props.projects.map((item)=><option value={item.id}>{item.projectName}</option>)}
					</select>
				</div>
                <div className="form-group">
					<label for="user">Пользователь</label>
						<select name="user" className='form-control' onChange={(event)=>this.handleChange(event)}>
                            <option value=''></option>
							{this.props.users.map((item)=><option value={item.id}>{item.username}</option>)}
					</select>
				</div>
				<input type="submit" className="btn btn-primary" value="Save" />
			</form>
		);
	}
}

export default ToDoForm