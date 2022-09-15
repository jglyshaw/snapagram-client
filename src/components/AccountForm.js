import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {Routes, Route, useNavigate} from 'react-router-dom'
import { setAccount } from '../redux/account'



function SignupForm({isSignup, onSubmitCall}) {

    const inputStle = {
        marginBottom: "25px",
    }

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [usernameField, setUsernameField] = useState("")
    const [passwordField, setPasswordField] = useState("")
    const [emailField, setEmailField] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showAlert, setAlert] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault()

        if (usernameField === "" || passwordField === "" || usernameField.includes(" ")) {
            setAlert(true)
            return;
        }
        setAlert(false)
        dispatch(setAccount(true))
        navigate('/');
        
    }

    return (
        <form onSubmit={(e) => onSubmit(e)} style={{ backgroundColor: "white" }}>
            {showAlert && <Alert severity="error">Invalid Form Data</Alert>}
            <br />
            <Grid container>
                <label>Username</label>
                <input style={inputStle} type='text' placeholder='' value={usernameField} onChange={(e) => setUsernameField(e.target.value)} />
                <br/>
                {isSignup && <>
                <label>Email</label>
                <input style={inputStle} type='text' placeholder='' value={emailField} onChange={(e) => setEmailField(e.target.value)} />
                </> }

                <label>Password</label>
                <input style={inputStle} type={showPassword ? "text" : "password"} value={passwordField} onChange={(e) => setPasswordField(e.target.value)} />
                <input style={inputStle} type='checkbox' onClick={() => setShowPassword(!showPassword)} /> <label>Show Password</label>
                <input type='submit' value={isSignup ? "Create Account" : "Sign In"} className='btn btn-block' />
            </Grid>
        </form>);
}

export default SignupForm;