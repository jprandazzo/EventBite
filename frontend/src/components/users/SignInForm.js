import { useState } from "react"
import { useDispatch } from "react-redux"
import {login} from "../../store/sessionReducer"
import { createUser, fetchUser, loginUser } from "../../store/usersReducer";

export default function SignUpForm () {
    const dispatch = useDispatch();
    // need to set a sessionUser such that if present, redirect and do 
    // not allow user to sign up
    // const [firstName, setFirstName] = useState('')
    // const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // useEffect(() =>{
    //     setFirstName(firstName)
    // }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        // let user = {email, password}
        return dispatch(login({email, password}))
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li>{error}</li>)}
                </ul>
                <label>Email
                    <input type='text' name='email' onChange={e => setEmail(e.target.value)}></input>
                </label>
                <br />
                <label>Password
                    <input type='password' name='password' onChange={e => setPassword(e.target.value)}></input>
                </label>
                <br />
                <input type='submit' value='Sign In' />
            </form>
        </>
    )
}