import { Outlet, Link } from "react-router-dom";
import NavCSS from './NavCSS.css'
import blog from '../blog.png'
function Navbar() {
    return (
        <>
            <ul >
            <div style = {{padding: "20px"}}>
                <li><img src={blog} width="40" style = {{marginRight: "10px"}}/></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/counter">Counter</Link></li>
                <li><Link to="/posts">Posts</Link></li>
            </div>
            </ul>
            <Outlet />
        </>
    );
}

export default Navbar;