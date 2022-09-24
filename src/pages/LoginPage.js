import Alert from '@mui/material/Alert';
import { useState } from "react";
import { Card } from '@mui/material';
import { signin, signup } from "../api/routes";
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import banner from '../images/banner.png'

function LoginPage({setLoggedIn}) {
    const backdrop = {
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
    }


    const inputStyle = {
        marginBottom: "25px",
        width: "100%"
    }

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
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "14px 20px",
        margin: "8px 0",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    }


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

    const [usernameField, setUsernameField] = useState("")
    const [passwordField, setPasswordField] = useState("")
    const [emailField, setEmailField] = useState("")
    const [alertText, setAlertText] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [showAlert, setAlert] = useState(false);

    const navigate = useNavigate();

    return (
        <div style={backdrop}>
            <img src={banner} width="250" alt="banner" />
            <br />
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

                    <input type='submit' value={isSignup ? "Sign Up" : "Sign In"} style={buttonStyle} />
                </form>

                {!isSignup && <input type='button' value="Create Account" style={buttonStyle} onClick={() => handleSwitch(true)} />}

            </Card>
            <p>© 2022 Snapagram Inc.</p>
        </div>);
}

export default LoginPage;