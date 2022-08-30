import { Outlet, Link } from "react-router-dom";
import NavCSS from './NavCSS.css'
import blog from '../blog.png'
function Navbar() {
    return (
        <>
            <ul >
            <div style = {{padding: "30px"}}>
                <li><img src={blog} alt="Girl in a jacket" width="40"/></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/user">User</Link></li>
                <li><Link to="/counter">Counter</Link></li>
                <li><Link to="/shopping">Shopping</Link></li>
            </div>
            </ul>
            <Outlet />
        </>
    );
}

export default Navbar;