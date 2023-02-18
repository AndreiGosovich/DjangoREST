import React from 'react'
import {Link} from 'react-router-dom'

class Menu extends React.Component {
    constructor(props) {
		super(props)
	}
    
    render() {
        // console.log(this.props.is_authenticated)
        return (
            <menu>
                <ul className='menu list-group-flush'>
                    <li className='list-group-item'>
                        <Link to='/'>Projects</Link>
                    </li>

                    <li className='list-group-item'>
                        <Link to='/todos'>ToDos</Link>
                    </li>

                    <li className='list-group-item'>
                        <Link to='/users'>Users</Link>
                    </li>

                    <li className='list-group-item'>
                        {
                            
                            this.props.is_authenticated
                            ? <button onClick={()=>this.props.logout()}>Logout ({this.props.currentUser})</button> 
                            : <Link to='/login'>Login</Link>
                        }
                    </li>
                </ul>
            </menu>
            
        )
    }
}

export default Menu;