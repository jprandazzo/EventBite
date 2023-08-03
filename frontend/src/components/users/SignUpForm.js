import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, Link } from 'react-router-dom';
import * as sessionActions from "../../store/sessionReducer"
import './Authentication.css';

export default function SignUpForm () {
    const dispatch = useDispatch();
    const history = useHistory();

    // need to set a sessionUser such that if present, redirect and do 
    // not allow user to sign up

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);

    const focusInput = (e) => {
        //blur anything that's currently focused
        Array.from(document.querySelectorAll('.input-field-input'))
            .forEach(el => {
                el.blur()
            })
        
        //whichever div is clicked, find its input and focus it
        if (e.target.className === 'auth-input-box') {

            let textFieldTitle = Array.from(e.target.childNodes).filter(el => el.className === 'signup-signin-field-title')[0]
            let input = e.target.childNodes[2].childNodes[0].childNodes[0]
            input.focus()
        } else if (e.target.className === 'signup-signin-field-title') {
            
            let outerDiv = e.target.parentNode
            let input = outerDiv.childNodes[2].childNodes[0].childNodes[0]
            input.focus()

        } else if (e.target.className === 'signup-signin-field-input') {
            e.target.focus()
        }
    }

    function setClosestDivsActive(e){

        //add 'focus' class to both surrounding divs of the input
        //that was focused
        let outerDiv = e.target.closest('div')
        outerDiv.classList.add('active-div')

        let textFieldTitle = Array.from(outerDiv.childNodes).filter(el => el.className === 'signup-signin-field-title')[0]
        textFieldTitle.classList.add('active-input')
    }

    function setClosestDivsInactive(e) {
        //remove 'focus' class from both surrounding divs of the input
        //that was blurred
        let outerDiv = e.target.closest('div')
        outerDiv.classList.remove('active-div')
        let textFieldTitle = Array.from(outerDiv.childNodes).filter(el => el.classList.contains('signup-signin-field-title'))[0]
        textFieldTitle.classList.remove('active-input')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let firstName = 'joe';
        let lastName = 'ra';

        return dispatch(sessionActions.signup({email, password, firstName, lastName}))
            .catch(async (res) => {
                let data;
                debugger
                try {
                // .clone() essentially allows you to read the response body twice
                data = await res.clone().json();
                debugger
                } catch {
                    debugger
                data = await res.text(); // Will hit this case if, e.g., server is down
                }
                debugger
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            })
            .then(() =>{history.push('/')});
    }
    return(
        <>
            <main onClick={e => focusInput(e)}>
            <section className='split split-left' id='signin'>
                    <div className='auth-centered'>
                        <div id='eblogo-auth'>
                            <Link to='/'>
                                <img src='https://cdn.evbstatic.com/s3-build/prod/1322331-rc2023-07-24_16.04-5e36c7c/django/images/logos/eb_orange_on_white_1200x630.png' />
                            </Link>
                        </div>
                        <h1 id='signup-signin-h1'>Create an account</h1>

                        <form>
                            <div className='auth-input-box'>
                                <div className='signup-signin-field-title'>
                                    Email address
                                </div>

                                <br />

                                <span >
                                    <label>
                                        <input className='signup-signin-field-input'
                                               type='text' 
                                               name='email'
                                               onChange={e => setEmail(e.target.value)}
                                               onFocus={e => setClosestDivsActive(e)}
                                               onBlur={e => setClosestDivsInactive(e)}
                                        />
                                    </label>
                                </span>
                            </div>

                            <br />

                            <div className='auth-input-box'>
                                <div className='signup-signin-field-title'>
                                    Password
                                </div>

                                <br />

                                <span >
                                    <label>
                                        <input className='signup-signin-field-input'
                                               type='password' 
                                               name='password'
                                               onChange={e => setPassword(e.target.value)}
                                               onFocus={e => setClosestDivsActive(e)}
                                               onBlur={e => setClosestDivsInactive(e)}
                                        />
                                    </label>
                                </span>
                            </div>

                            <br />

                            <ul>
                                {errors.map(error => <li key={error}>{error}</li>)}
                            </ul>

                            <br />

                            <button className='auth-button' onClick={handleSubmit}>
                                Sign up
                            </button>
                        </form>
                        <div className='signup-signin-switch'>
                            <Link to='/signin'>Log in</Link>
                        </div>
                    </div>
                </section>
                <section className='split split-right' id='auth-side-photo'>
                    <div className='auth-centered login-image'>
                        {/* <img src='https://i.ibb.co/Qp4jyky/Screenshot-2023-07-26-at-1-38-15-PM.png' /> */}
                    </div>
                </section>
            </main>
        </>
    )
}