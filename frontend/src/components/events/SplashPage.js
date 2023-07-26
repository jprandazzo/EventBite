import * as sessionActions from '/Users/joerandazzo/Documents/App Academy/aA Projects/Eventbite2/eventbite/frontend/src/store/sessionReducer.js';
import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import NavBarLoggedOut from "../NavBar/NavBarLoggedOut";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SplashPage.css';


export default function SplashPage () {
    let user = useSelector(sessionActions.getCurrentUser)

    return(
        <>
            <main id='splash-main'>
            {user ? <NavBarLoggedIn user={user} /> : <NavBarLoggedOut />}
            <br />
            <br />
            <div className='splash-banner'>
                <button>
                    <Link to='/'>
                        Find your next event
                    </Link>
                </button>
            </div>
            <h2>This is the event index page</h2>
            </main>
        </>
    )
}