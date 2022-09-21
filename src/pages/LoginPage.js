import Alert from '@mui/material/Alert';
import { useState } from "react";
import { Card } from '@mui/material';
import { signin } from "../api/routes";
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAccount } from '../redux/account'
import banner from '../images/banner.png'

function LoginPage() {
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
            let response = await signin({
                username: usernameField,
                password: passwordField,
            })

            let account = response.data.result
            localStorage.setItem('profile', JSON.stringify({ account }))


        } catch (error) {
            setAlertText("Invalid Credentials")
            setAlert(true)
            return;
        }

        dispatch(setAccount(true))
        navigate("/")
        setUsernameField("")
        setPasswordField("")
    }


    const [usernameField, setUsernameField] = useState("")
    const [passwordField, setPasswordField] = useState("")
    const [alertText, setAlertText] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showAlert, setAlert] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate();


    return (
        <div style={backdrop}>
            <img src={banner} width="250" alt="banner" />
            <br />
            <br />
            <Card style={formStyle}>

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

                    <input type='submit' value={"Sign In"} style={buttonStyle} />
                </form>

                {<input type='button' value="Create Account" style={buttonStyle} onClick={() => navigate("/signup")} />}

            </Card>
            <p>© 2022 Snapagram Inc.</p>
        </div>);
}

export default LoginPage;