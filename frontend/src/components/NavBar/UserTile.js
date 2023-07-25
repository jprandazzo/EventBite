import { Link } from "react-router-dom"
export default function UserTile ({user}) {
    
    if (user) {
        return (
            <span>{user.email}</span>
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