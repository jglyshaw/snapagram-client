

import AccountForm from '../components/AccountForm';
import banner from '../images/banner.png'


function AccountPage() {

    const backdrop = {
        backgroundColor: '#ecf0f1',
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
        minHeight: '200px'
    }

    return (
        <div style={backdrop}>
            <img src={banner} width = "300px"alt="hello"/>
            <br/>
            <br/>
            <br/>
            <AccountForm isSignup={true}/>
           <br/>
           <br/>
           <br/>
        </div>);
}

export default AccountPage;