import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import blog from '../images/blog.png'
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const ResponsiveAppBar = ({ setLoggedIn }) => {

  let user = JSON.parse(localStorage.getItem('profile')).account;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Links = ({color}) => {
    return (
      <>
        <Link to="/allposts" style={{color: color, textTransform: "capitalize", textDecoration: "none", height: "100%" }} >
          <MenuItem onClick={handleClose}>All Posts</MenuItem></Link>
        <Link to="/posts" style={{color: color, textTransform: "capitalize", textDecoration: "none", height: "100%" }} >
          <MenuItem onClick={handleClose}>My Posts</MenuItem></Link>
        <Link to={`/account/${user.username}`} style={{color: color, textTransform: "capitalize", textDecoration: "none", height: "100%" }} >
          <MenuItem onClick={handleClose}>Account</MenuItem></Link>
      </>)
  }

  const signOut = () => {
    setLoggedIn(false)
    localStorage.clear();
    navigate("/login")
  }

  return (
    <AppBar position="sticky" style={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ display: { xs: 'none', md: "inline" } }}>
            <img src={blog} alt="" width="40" style={{ marginRight: "10px" }} />
          </Box>
          <Typography
            noWrap
            sx={{
              mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 900,
              letterSpacing: '.05rem', color: 'inherit', textDecoration: 'none', marginRight: "30px"
            }} >
            Snapagram
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Links color="black"/>
              <MenuItem onClick={signOut}>Logout</MenuItem>
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'inline', md: "none" } }}>
            <img src={blog} alt="" width="40" style={{ marginRight: "10px" }} />
          </Box>
          <Typography
            noWrap
            sx={{
              mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700,
              letterSpacing: '.05rem', color: 'inherit', textDecoration: 'none',
            }}>
            Snapagram
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Links color="white" />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button variant="contained" style={{ marginRight: "20px" }} sx={{ display: { xs: 'none', md: 'inline' } }} onClick={signOut}>Logout</Button>
            <Tooltip title={user.username}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt={user.username} src={user.image} />
              </IconButton>
            </Tooltip>
          </Box>


        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
