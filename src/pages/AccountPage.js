// External MUI Imports
import Paper from '@mui/material/Paper';

function AccountPage() {

    // --- Local Variables --- //
    let user = JSON.parse(localStorage.getItem('profile')).account;

    // --- Main Return --- //
    return (
    <>

        <Paper style={{ margin: "20px", padding: "20px" }}>
            <div style={{ textAlign: "center" }}>
                
                <div style={{ display: "inline-block", textAlign: "left"}}>
                    <h1>Username: {user.username}</h1>
                    <h3>Email: {user.email}</h3>
                </div>

            </div>
        </Paper>

    </>
    );
}

export default AccountPage;