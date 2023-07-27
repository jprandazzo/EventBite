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
            {user ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
            <br />
            <br />
            <div className='splash-banner'>
                <Link to='/search'>
                    <button>
                        Find your next event
                    </button>
                </Link>
            </div>
            <h2>This is the event index page</h2>
            </main>
        </>
    )
}