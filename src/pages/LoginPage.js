// Local APIs
import { signin, signup } from "../api/routes";

// Local Images
import banner from '../images/banner.png'

// External MUI Imports
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import { Card, Button } from '@mui/material';
import Alert from '@mui/material/Alert';

// External Imports
import { useNavigate } from 'react-router-dom'
import { useState } from "react";



function LoginPage({ setLoggedIn }) {

    // --- React Hooks --- //
    const [usernameField, setUsernameField] = useState("")
    const [passwordField, setPasswordField] = useState("")
    const [emailField, setEmailField] = useState("")
    const [alertText, setAlertText] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [showAlert, setAlert] = useState(false);

    const navigate = useNavigate();


    // --- Supporting Functions --- //
    const onSubmit = async (e) => {
        e.preventDefault()
        if (usernameField === "" || passwordField === "") {
            setAlertText("Invalid Form Data")
            setAlert(true)
            return;
        }
        setAlert(false)


        let success;

        isSignup ? success = await onSignup() : success = await onLogin()

        if (!success) {
            return
        }
        setLoggedIn(true);
        navigate("/posts")
        setUsernameField("")
        setPasswordField("")
    }


    const onLogin = async () => {
        try {
            let response = await signin({
                username: usernameField,
                password: passwordField,
            })
            let account = response.data
            localStorage.setItem('profile', JSON.stringify({ account }))
            return true;
        } catch (error) {
            setAlertText("Invalid Credentials")
            setAlert(true)
            return false;
        }
    }

    const onSignup = async () => {
        try {
            let response = await signup({
                username: usernameField,
                password: passwordField,
                email: emailField
            })
            let account = response.data
            localStorage.setItem('profile', JSON.stringify({ account }))
            return true;
        } catch (error) {
            setAlertText("Invalid Credentials")
            setAlert(true)
            return false;
        }
    }

    const handleSwitch = (isSignup) => {
        setUsernameField("")
        setPasswordField("")
        setAlert(false)
        setIsSignup(isSignup)
    }

    

    // --- Style structures --- //
    const backdropStyle = { fontFamily: 'sans-serif', padding: '50px', textAlign: 'center' }
    
    const inputStyle = { marginBottom: "25px", width: "100%" }

    const formStyle = {
        textAlign: "left",
        width: "500px",
        maxWidth: "80%",
        display: "inline-block",
        padding: "20px",
        backgroundColor: "white"
    }

    const buttonStyle = {
        width: "100%",
        marginBottom: "10px",
        marginTop: "10px"
    }


    // --- Main Return --- //
    return (
    <>
        <div style={backdropStyle}>
            <img src={banner} width="250" alt="banner" style = {{marginBottom: "20px"}}/>
            <br />
            <Card style={formStyle}>
                {isSignup && <>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => handleSwitch(false)}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </>}

                <form onSubmit={(e) => onSubmit(e)} >
                    {showAlert && <Alert severity="error">{alertText}</Alert>}
                    <br />
                    <label style={{ marginBottom: "5px" }}>Username</label>
                    <TextField
                        value={usernameField}
                        style={inputStyle}
                        onChange={(e) => setUsernameField(e.target.value)}
                        size="small"
                    />

                    {isSignup && <><label style={{ marginBottom: "5px" }}>Email</label>
                        <TextField
                            value={emailField}
                            style={inputStyle}
                            onChange={(e) => setEmailField(e.target.value)}
                            size="small"
                        /> </>}

                    <label style={{ marginBottom: "5px" }}>Password</label>
                    <TextField
                        value={passwordField}
                        style={inputStyle}
                        type={showPassword ? "input" : "password"}
                        onChange={(e) => setPasswordField(e.target.value)}
                        size="small"
                    />
                    <FormControlLabel
                        style={{ marginLeft: "5px" }}
                        control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} label="Show Password" />}
                        label="Show Password" />
                    <Button type='submit' style={buttonStyle} variant="contained">{isSignup ? "Sign Up" : "Sign In"}</Button>
                </form>

                {!isSignup && <Button style={buttonStyle} variant="contained" onClick={() => handleSwitch(true)}>Create Account</Button>} 

            </Card>
            <p>© 2022 Snapagram Inc.</p>
        </div>
    </>
    );
}

export default LoginPage;