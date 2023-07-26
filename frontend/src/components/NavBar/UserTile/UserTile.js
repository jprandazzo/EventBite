import { Link } from "react-router-dom"
import './UserTile.css'

export default function UserTile ({user}) {
    const toggleDropdown = (e) => {
        let dropdown = e.target.children[0]
        dropdown.style.display === 'none' ? dropdown.style.display = 'block' : dropdown.style.display = 'none'
    }

    if (user) {

        return (
            <>
                <span class='user-dropdown' onClick={e => toggleDropdown(e)}>
                    {user.email}
                    <div class='user-dropdown-content'>
                        <ul>
                            <li>Browse Events</li>
                            <li>Manage my Events</li>
                            <li>Tickets</li>
                            <li>Liked</li>
                            <li>Following</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                </span>
            </>
        )
    } else {
        return (
            <>
            <span>
                <Link to='/signin'>Log In</Link>
            </span>
            <span>
                <Link to='/signup'>Sign Up</Link>
            </span>
            </>
        )
    }
}