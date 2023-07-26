import { Link } from "react-router-dom"
import './UserTile.css'

export default function UserTile ({user}) {
    const toggleDropdown = (e) => {
        // let dropdown = e.target.childNodes[0]

        // if (dropdown.style.display === 'none') {
        //     dropdown.style.display === 'block'
        // } else dropdown.style.display === 'none'
    }

    if (user) {

        return (
            <>
                <button class='dropdown' onClick={e => toggleDropdown(e)}>
                    {user.email}
                    {/* <div class='dropdown-content'>
                        <ul>
                            <li>Browse Events</li>
                            <li>Manage my Events</li>
                            <li>Tickets</li>
                            <li>Liked</li>
                            <li>Following</li>
                            <li>Logout</li>
                        </ul>
                    </div> */}
                </button>
            </>
        )
    } else {
        return (
            <>
            <span>
                <Link to='/signin'>Log In</Link>
            </span>
            <span>
                <Link to='/signin/signup'>Sign Up</Link>
            </span>
            </>
        )
    }
}