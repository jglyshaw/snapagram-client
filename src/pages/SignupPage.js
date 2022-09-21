import Alert from '@mui/material/Alert';
import { useState } from "react";
import { Card } from '@mui/material';
import { signup } from "../api/routes";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAccount } from '../redux/account'
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import banner from '../images/banner.png'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function SignupPage() {
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
        if (usernameField === "" || passwordField === "" || usernameField.includes(" ")) {
            setAlertText("Invalid Form Data")
            setAlert(true)
            return;
        }
        setAlert(false)

        try {
            await signup({
                username: usernameField,
                password: passwordField,
                email: emailField
            })
        } catch (error) {
            setAlertText("Invalid Credentials")
            setAlert(true)
            return;
        }

        localStorage.setItem('profile', JSON.stringify({usernameField}))
        navigate("/")
        dispatch(setAccount(true))
        setUsernameField("")
        setPasswordField("")
    }


    const [usernameField, setUsernameField] = useState("")
    const [passwordField, setPasswordField] = useState("")
    const [emailField, setEmailField] = useState("")
    const [alertText, setAlertText] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showAlert, setAlert] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate();


    return (
        <div style={backdrop}>
            <img src={banner} width="250" alt="banner " />
            <br/>
            <br/>
            <Card style={formStyle}>

                <IconButton color="primary" aria-label="add to shopping cart" onClick = {() => navigate("/login")}>
                    <ArrowBackIosNewIcon />
                </IconButton>

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

                    <label style={{ marginBottom: "5px" }}>Email</label>
                    <TextField
                        value={emailField}
                        style={inputStyle}
                        onChange={(e) => setEmailField(e.target.value)}
                        size="small"
                    />

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

                    <input type='submit' value={"Create Account"} style={buttonStyle} />
                </form>


            </Card>
            <p>© 2022 Snapagram Inc.</p>
        </div>);
}

export default SignupPage;