import Paper from '@mui/material/Paper';

function AccountPage() {

    let user = JSON.parse(localStorage.getItem('profile')).account;

    return (<>

        <Paper style={{ margin: "50px", padding: "100px" }}>
            <div style={{ textAlign: "center" }}>
                <div style={{ display: "inline-block", textAlign: "left"}}>
                    <h1>Username: {user.username}</h1>
                    <h3>Email: {user.email}</h3>
                </div>

            </div>
        </Paper>


    </>);
}

export default AccountPage;