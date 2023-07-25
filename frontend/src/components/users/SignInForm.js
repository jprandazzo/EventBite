import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/sessionReducer"
import { createUser, fetchUser, loginUser } from "../../store/usersReducer";
import './Authentication.css';

export default function SignInForm () {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(sessionActions.getCurrentUser)
    const ref = useRef(null);
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

    const focusInput = (e) => {
        if (e.target.className === 'auth-input-box') {
            ref.current.focus();

            e.target.classList.add('active-div');
            let textFieldTitle = Array.from(e.target.childNodes).filter(e => e.className === 'input-field-title')[0]
            textFieldTitle.classList.add('active-input')
        } else if (e.target.className.includes('input-field')) {
            let outerDiv = e.target.closest('div.auth-input-box')
            outerDiv.classList.add('active-div')

            let textFieldTitle = Array.from(outerDiv.childNodes).filter(e => e.className === 'input-field-title')[0]
            textFieldTitle.classList.add('active-input')
        }

        //     Array.from(document.querySelectorAll('*'))
        //         .forEach(el => {
        //             if (el !== e.target && el.classList.contains('active')) {
        //                 let activeClasses = Array.from(el.classList).filter(el => el.includes('active'))
        //                 activeClasses.forEach(activeClass => el.classList.remove(activeClass))
        //             }
        //         })
        // } else {
        //     ref.current.blur();
        //     // toggleDivFocus(e.target);
        // }
    }

    // //listens for focus on textbox
    // document.querySelector('text-field-input')
    //     .addEventListener("focus", changeClosestDivColor);

    // function changeClosestDivColor(e){
    //     let outerDiv = e.closest('div')
    //     outerDiv.classList.add('active-div')


    //     let inputTitle = document.querySelector('.input-field-title')
    //     inputTitle.classList.add('active-input')

    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setErrors([])
        // let user = {email, password}
        return dispatch(sessionActions.login({email, password}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            })
            .then(() =>{history.push('/')});
    };
    return(
        <>
            <main onClick={e => focusInput(e)}>
                <section className='split left' id='signin'>
                    <div className='centered'>
                        <div id='eblogo'>
                            <img src='https://cdn.evbstatic.com/s3-build/prod/1322331-rc2023-07-24_16.04-5e36c7c/django/images/logos/eb_orange_on_white_1200x630.png' />
                        </div>
                        <h1>Log in</h1>

                        <form>
                            <div className='auth-input-box'>
                                <div className='input-field-title'>
                                    Email address
                                </div>

                                <br />

                                <span >
                                    <label>
                                        <input className='input-field-input'
                                               ref={ref}
                                               type='text' 
                                               name='email'
                                               onChange={e => setEmail(e.target.value)}
                                            //    onFocus={e => changeClosestDivColor(e.target)}
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

                            <ul>
                                {errors.map(error => <li key={error}>{error}</li>)}
                            </ul>

                            <br />

                            <button className='auth-button' onClick={handleSubmit}>
                                Log in
                            </button>
                        </form>
                    </div>
                </section>
                <section className='split right' id='auth-side-photo'>
                    <div className='centered'>*Photo goes here*</div>
                </section>
            </main>
        </>
    )
}