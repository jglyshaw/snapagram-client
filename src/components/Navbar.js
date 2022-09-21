import { Outlet, Link } from "react-router-dom";
import blog from '../images/blog.png'
import NavCSS from '../style/nav.css'
import Button from '@mui/material/Button';
import { setLoggedIn } from '../redux/account'
import { useDispatch, useSelector  } from 'react-redux'
import { useNavigate } from 'react-router-dom'



function Navbar() {
  let user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const signOut = () => {
    localStorage.clear();
    dispatch(setLoggedIn(false))
    window.location.reload(false);
    navigate("/login")
  }

    return (
        <>
            <ul >
            <div style = {{padding: "20px"}}>
                <li><img src={blog} alt = "" width="40" style = {{marginRight: "10px"}}/></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/counter">Counter</Link></li>
                <li><Link to="/allposts">Posts</Link></li>
                <li><Link to="/posts">Your Posts</Link></li>
                <li style={{color:"white"}}>User: {user? user.account.username : null}</li>
                <Button variant="contained" onClick = {signOut}>Sign Out</Button>
            </div>
            </ul>
            <Outlet />
        </>
    );
}

export default Navbar;