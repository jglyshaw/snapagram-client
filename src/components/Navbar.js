import { Outlet, Link } from "react-router-dom";
import blog from '../images/blog.png'
import NavCSS from '../style/nav.css'

function Navbar() {
    return (
        <>
            <ul >
            <div style = {{padding: "20px"}}>
                <li><img src={blog} alt = "" width="40" style = {{marginRight: "10px"}}/></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/counter">Counter</Link></li>
                <li><Link to="/posts">Posts</Link></li>
                <li><Link to="/account">Account</Link></li>
            </div>
            </ul>
            <Outlet />
        </>
    );
}

export default Navbar;