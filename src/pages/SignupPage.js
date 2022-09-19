

import AccountForm from '../components/AccountForm';
import banner from '../images/banner.png'
import { signup } from "../api/routes";

function SignupPage() {
    const backdrop = {
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
    }

    const onSubmitCall = async (username, password, email) => {
        try {
            await signup({
                username: username,
                password: password,
                email: email
            })
            return true;
        } catch (error) {
            return false
        }
    }

    return (
        <div style={backdrop}>
            <img src={banner} width="250" alt="hello" />
            <br />
            <br />
            <AccountForm isSignup={true} onSubmitCall={onSubmitCall} />
            <br />
            <p>© 2022 Snapagram Inc.</p>
        </div>);
}

export default SignupPage;