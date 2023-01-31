import React from 'react'
import {Link} from 'react-router-dom'

class Menu extends React.Component {
    constructor(props) {
		super(props)
	}
    
    render() {
        console.log(this.props.is_authenticated)
        return (
            <menu>
                <ul>
                    <li>
                        <Link to='/'>Projects</Link>
                    </li>

                    <li>
                        <Link to='/todos'>ToTos</Link>
                    </li>

                    <li>
                        <Link to='/users'>Users</Link>
                    </li>

                    <li>
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