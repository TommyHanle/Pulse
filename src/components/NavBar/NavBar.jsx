import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        <nav>
            <div id="pulsenav">PULSE</div>
            <div>
                Welcome, {user.name}
                
                &nbsp;&nbsp;&nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
            </div>
        </nav>
    )
}