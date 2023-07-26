import * as sessionActions from '/Users/joerandazzo/Documents/App Academy/aA Projects/Eventbite2/eventbite/frontend/src/store/sessionReducer.js';
import NavBarLoggedIn from "../NavBar/NavBarLoggedIn"
import NavBarLoggedOut from "../NavBar/NavBarLoggedOut"

import { useSelector } from 'react-redux';


export default function SplashPage () {
    let user = useSelector(sessionActions.getCurrentUser)

    return(
        <>
            {user ? <NavBarLoggedIn user={user} /> : <NavBarLoggedOut />}
            <br />
            <br />
            <h2>This is the event index page</h2>
        </>
    )
}