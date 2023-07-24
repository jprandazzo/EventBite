import React, { useState } from "react"
import { useDispatch } from "react-redux"
import {signup} from '../../store/sessionReducer';
import { createUser, fetchUser } from "../../store/usersReducer";

export default function SignUpForm () {
    const dispatch = useDispatch();

    // need to set a sessionUser such that if present, redirect and do 
    // not allow user to sign up
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);

    // useEffect(() =>{
    //     setFirstName(firstName)
    // }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        return dispatch(signup({email, password, firstName, lastName}))
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
                <label>First Name
                    <input type='text' name='firstName' onChange={e => setFirstName(e.target.value)} />
                </label>
                <br />
                <label>Last Name
                    <input type='text' name='lastName' onChange={e => setLastName(e.target.value)} />
                </label>
                <br />
                <input type='submit' value='Sign Up' />
            </form>
        </>
    )
}