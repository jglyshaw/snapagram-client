

import AccountForm from '../components/AccountForm';
import banner from '../images/banner.png'
import { signin } from "../api/routes";


function LoginPage() {

    const backdrop = {
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
    }

    const onSubmitCall = async (username, password, email) => {
        try {
            await signin({
                username: username,
                password: password
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
            <AccountForm isSignup={false} onSubmitCall={onSubmitCall} />
            <br />
            <p>© 2022 Snapagram Inc.</p>
        </div>);
}

export default LoginPage;