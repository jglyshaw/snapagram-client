import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { useState } from "react";
import { Card, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAccount } from '../redux/account'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



function SignupForm({ isSignup, onSubmitCall }) {

    const inputStyle = {
        marginBottom: "25px",
        width: "100%"
    }

    const formStyle = {
        textAlign: "left",
        width: "500px",
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

    const [usernameField, setUsernameField] = useState("")
    const [passwordField, setPasswordField] = useState("")
    const [emailField, setEmailField] = useState("")
    const [alertText, setAlertText] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showAlert, setAlert] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        if (usernameField === "" || passwordField === "" || usernameField.includes(" ")) {
            setAlertText("Invalid Form Data")
            setAlert(true)
            return;
        }
        setAlert(false)

        let success = await onSubmitCall(usernameField, passwordField, null)
        if (!success) {
            setAlertText("Invalid Credentials")
            setAlert(true)
            return;
        }
        navigate("/")
        dispatch(setAccount(true))
        setUsernameField("")
        setPasswordField("")
    }

    return (
        <Card style={formStyle}>
            {isSignup &&
                <IconButton aria-label="add to favorites" onClick={() => navigate("/login")}>
                    <ArrowBackIcon  />
                </IconButton>
            }


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

                {isSignup && <>
                    <label style={{ marginBottom: "5px" }}>Email</label>
                    <TextField
                        value={emailField}
                        style={inputStyle}
                        onChange={(e) => setEmailField(e.target.value)}
                        size="small"
                    />
                </>}

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

                <input type='submit' value={isSignup ? "Create Account" : "Sign In"} style={buttonStyle} />
            </form>

            {!isSignup && <input type='button' value="Create Account" style={buttonStyle} onClick={() => navigate("/signup")} />}

        </Card>)
}

export default SignupForm;