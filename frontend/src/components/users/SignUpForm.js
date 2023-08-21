import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/sessionReducer"
import './Authentication.css';

export default function SignUpForm () {
    const dispatch = useDispatch();
    const history = useHistory();

    // need to set a sessionUser such that if present, redirect and do 
    // not allow user to sign up

    const currentUser = useSelector(sessionActions.getCurrentUser)
    if (currentUser) history.push('/')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);
    const errorClassesArray = ['error-text', 'error-div', 'login-errors', 'email-errors', 'pw-errors'];

    const blurOtherInput = (selectedEl) => {
        let arr = Array.from(document.querySelectorAll('*'))
        arr.forEach(el=> {
            if (el.classList.contains('.signup-signin-field-input')) {
                if (el !== selectedEl) el.blur()
            } else if (el.classList.contains('auth-input-box')) {
                if (el !== selectedEl) el.classList.remove('active-div')
            } else if (el.classList.contains('signup-signin-field-title')) {
                if (el !== selectedEl) el.classList.remove('active-input')
            }
        })
    }
    const focusInput = async (e) => {
        e.stopPropagation()
        const selectedEl = e.target
        //blur anything that's currently focused
        await blurOtherInput(selectedEl)
        
        //whichever div is clicked, find its input and focus it
        if (selectedEl.classList.contains('auth-input-box')) {
            e.stopPropagation()
            if (selectedEl.classList.contains('error-div')) e.target.classList.remove('error-div')
            let textFieldTitle = Array.from(selectedEl.childNodes).filter(el => el.classList.length && el.classList.contains('signup-signin-field-title'))[0]
            textFieldTitle.classList.remove('error-text')
            let input = Array.from(selectedEl.querySelectorAll('*')).filter(el=>el.classList.contains('signup-signin-field-input'))[0]
            input.focus()
        } else if (selectedEl.classList.contains('signup-signin-field-title')) {
            e.stopPropagation()
            if (selectedEl.classList.contains('error-input')) selectedEl.classList.remove('error-input')
            let outerDiv = selectedEl.parentNode
            outerDiv.classList.remove('error-div')
            let input = Array.from(outerDiv.querySelectorAll('*')).filter(el=>el.classList.contains('signup-signin-field-input'))[0]
            input.focus()

        } else if (selectedEl.classList.contains('signup-signin-field-input')) {
            e.stopPropagation()
            selectedEl.focus()
        }
    }

    function setClosestDivsActive(e){
        // document.querySelectorAll('*').forEach(el=>if ())
        //add 'focus' class to both surrounding divs of the input
        //that was focused
        // debugger
        let outerDiv = e.target.closest('div')
        outerDiv.classList.add('active-div')

        let textFieldTitle = Array.from(outerDiv.childNodes).filter(el => el.className === 'signup-signin-field-title')[0]
        console.log(outerDiv)
        console.log(textFieldTitle)
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
                try {
                // .clone() essentially allows you to read the response body twice
                data = await res.clone().json();
                } catch {
                data = await res.text(); // Will hit this case if, e.g., server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            })
    }

    return(
        <>
            <main onClick={e => focusInput(e)}>
            <section className='split split-left' id='signin'>
                    <div className='auth-centered' id='signup-centered'>
                        <div className='auth-container' id='signup-container'>
                            <div id='eblogo-auth'>
                                <Link to='/'>
                                    <img src='https://eventbite-dev.s3.amazonaws.com/eventbite+logo.jpg' />
                                </Link>
                            </div>
                            <h1 id='signup-signin-h1'>Create an account</h1>
                            <form>
                                <div className={errors.length ? `error-div auth-input-box` :`auth-input-box`}>
                                    <div className={errors.length ? 'error-text signup-signin-field-title' : 'signup-signin-field-title'}>
                                        Email address
                                    </div>

                                    <br />

                                    <span >
                                        <label>
                                            <input className='signup-signin-field-input'
                                                type='text' 
                                                name='email'
                                                onChange={e => setEmail(e.target.value.toLowerCase())}
                                                onFocus={e => setClosestDivsActive(e)}
                                                onBlur={e => setClosestDivsInactive(e)}
                                            />
                                        </label>
                                    </span>
                                    <div className='email-errors'>{errors?.filter(e=>e.toLowerCase().includes('email'))}</div>
                                </div>

                                <br />

                                <div className={errors.length ? `error-div auth-input-box` :`auth-input-box`}>
                                    <div className={errors.length ? 'error-text signup-signin-field-title' : 'signup-signin-field-title'}>
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
                                    <div className='password-errors'>{errors?.filter(e=>e.toLowerCase().includes('password'))}</div>
                                </div>

                                <br />

                                <br />

                                <button className='auth-button' id='signup-button' onClick={handleSubmit}>
                                    Sign up
                                </button>
                            </form>
                            <div className='signup-signin-switch'>
                                <Link to='/signin'>Log in</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='split split-right' id='auth-side-photo'>
                    <div className='auth-centered login-image'/>
                </section>
            </main>
        </>
    )
}