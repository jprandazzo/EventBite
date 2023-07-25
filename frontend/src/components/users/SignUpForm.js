import React, { useState } from "react"
import { useDispatch } from "react-redux"
import {signup} from '../../store/sessionReducer';
import { createUser, fetchUser } from "../../store/usersReducer";
import './Authentication.css';

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
        // debugger

        return dispatch(signup({email, password, firstName, lastName}))
            .catch(async (res) => {
                let data;
                try {
                // .clone() essentially allows you to read the response body twice
                data = await res.clone().json();
                } catch {
                data = await res.text(); // Will hit this case if, e.g., server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }
    return(
        <>
            <main>
                <section class='split left' id='signup'>
                    <div class='centered'>
                        <div>*Logo*</div>
                        <h2>Create an Account</h2>
                        <form onSubmit={handleSubmit}>
                            <ul>
                                {errors.map(error => <li key={error}>{error}</li>)}
                            </ul>
                            <div class='auth-input-box'>
                                <div class='field-title'>
                                    Email address
                                </div>
                                <span>
                                    <label>
                                        <input type='text' 
                                            name='email'
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </label>
                                </span>
                            </div>

                            <br />

                            <label>
                                Password
                                <input type='password' 
                                       name='password' 
                                       onChange={e => setPassword(e.target.value)} 
                                />
                            </label>

                            <br />

                            <label>
                                First Name
                                <input type='text' 
                                       name='firstName' 
                                       onChange={e => setFirstName(e.target.value)} 
                                />
                            </label>

                            <br />

                            <label>
                                Last Name
                                <input type='text' 
                                       name='lastName' 
                                       onChange={e => setLastName(e.target.value)} 
                                />
                            </label>

                            <br />

                            <input class='auth-button' type='submit' value='Continue' />

                        </form>
                    </div>
                </section>
                <section class='split right' id='auth-side-photo'>
                    <div class='centered'>*Photo goes here*</div>
                </section>
            </main>
        </>
    )
}