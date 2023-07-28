import { Link } from "react-router-dom/";
import "./NotFoundErrorPage.css";

export default function NotFoundErrorPage () {
    return (
    <>
        <p>Oops, something went wrong!</p>
        <Link to='/create'>Create An Event</Link> <Link to='/events/search'>Find An Event</Link>
    </>
    )
}