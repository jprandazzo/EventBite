import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import * as sessionActions from "../../store/sessionReducer"
import './Authentication.css';

export default function SignInForm () {
    const history = useHistory();
    const dispatch = useDispatch();
    // need to set a sessionUser such that if present, redirect and do 
    // not allow user to sign up
    // const [firstName, setFirstName] = useState('')
    // const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const errorClassesArray = ['error-text', 'error-div', 'login-errors', 'email-errors', 'pw-errors']
    


    const currentUser = useSelector(sessionActions.getCurrentUser)
    if (currentUser) history.goBack()


    
    const focusInput = (e) => {
        e.stopPropagation()
        const selectedEl = e.target
        //blur anything that's currently focused
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

        //add 'focus' class to both surrounding divs of the input
        //that was focused
        if (errorClassesArray.forEach(e1=>{if(Array.from(e.target.classList).includes(e1)) return true})) {
            return
        }
        let outerDiv = e.target.closest('div')
        outerDiv.classList.add('active-div')

        let textFieldTitle = Array.from(outerDiv.querySelectorAll('*')).filter(el => el.classList.contains('signup-signin-field-title'))[0]
        textFieldTitle?.classList.add('active-input')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setErrors([])
        return dispatch(sessionActions.login({email, password}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) {
                    setErrors(data.errors)
                }
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            })
    };

    const demoLogin = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.login({
            email: 'demo@demo.com',
            password: 'password'
        }))
    }
    
    return(
        <>
            <main>
                <section className='split split-left' id='signin' onClick={e => focusInput(e)}>
                    <div className='auth-centered'>
                        <div id='eblogo-auth'>
                            <Link to='/'>
                                <img src='https://eventbite-dev.s3.amazonaws.com/eventbite+logo.jpg' />
                            </Link>
                        </div>
                        <h1 id='signup-signin-h1'>Log in</h1>

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
                                               onChange={e => setEmail(e.target.value)}
                                               onFocus={e => setClosestDivsActive(e)}
                                        />
                                    </label>
                                </span>
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
                                        />
                                    </label>
                                </span>
                            </div>

                            <br />

                            <div className='login-errors error-text'>
                                {errors[0]}
                            </div>

                            <br />

                            <button className='auth-button' onClick={handleSubmit}>
                                Log in
                            </button>

                            <button className='auth-button 'id='demo-login' onClick={demoLogin}>
                                Log in demo user
                            </button>
                        </form>
                        <div className='signup-signin-switch'>
                            <Link to='/signup'>Sign up</Link>
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