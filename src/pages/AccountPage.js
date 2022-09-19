

import AccountForm from '../components/AccountForm';
import banner from '../images/banner.png'




function AccountPage() {

    const backdrop = {
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
    }

    return (
        <div style={backdrop}>
            <img src={banner} width = "250" alt="hello"/>
            <br/>
            <br/>
            <AccountForm isSignup={false}/>
           <br/>
           <p>© 2022 Snapagram Inc.</p>
        </div>);
}

export default AccountPage;