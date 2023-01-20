import React from 'react'
import {Link} from 'react-router-dom'

const Menu = () => {
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
            </ul>
        </menu>
		
	)
}

export default Menu;