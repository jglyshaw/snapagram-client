import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Card, IconButton } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { setAccount } from '../redux/account'



function SignupForm({ isSignup, onSubmitCall }) {

    const inputStyle = {
        marginBottom: "25px",
        width: "100%"
    }

    const formStyle = {
        textAlign: "center",
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
        <Card style={formStyle}>
        <form onSubmit={(e) => onSubmit(e)} >
            {showAlert && <Alert severity="error">Invalid Form Data</Alert>}
            <br />
            <Grid container>

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
                    style={{marginLeft: "5px"}}
                    control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} label="Show Password" />}
                    label="Show Password" />

                <input type='submit' value={isSignup ? "Create Account" : "Sign In"} style={buttonStyle} />
            </Grid>
        </form>
        </Card>)
}

export default SignupForm;