import { useState } from "react"
import { useDispatch } from "react-redux"
import {login} from "../../store/sessionReducer"
import { createUser, fetchUser, loginUser } from "../../store/usersReducer";

export default function SignInForm () {
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
            });
    };
    return(
        <>
            <form /*onSubmit={handleSubmit}*/>
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
                <button onClick={handleSubmit}>Sign In</button>
            </form>
        </>
    )
}