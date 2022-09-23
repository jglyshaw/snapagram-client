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
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ResponsiveAppBar = ({ setLoggedIn }) => {

  let user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const linkStyle = {color: "white", textTransform: "capitalize", textDecoration: "none", height: "100%",  padding: "10px"}

  const signOut = () => {
    setLoggedIn(false)
    localStorage.clear();
    navigate("/login")
  }

  return (
    <AppBar position="sticky" style={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ display: { xs: 'none', md: "inline"} }}>

        <img src={blog} alt = "" width="40" style = {{marginRight: "10px", display: { xs: 'none', md: 'flex' } }} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}/>
        </Box>

          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              marginRight: "30px"
            }}
          >
            Snapagram
          </Typography>


          <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Link to="/allposts" style={linkStyle}>All Posts</Link>
              <Link to="/posts" style={linkStyle}>Your Posts</Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button variant="contained" style = {{marginRight : "20px"}} onClick={signOut}>Sign Out</Button>
            <Tooltip title={user.account.username}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt={user.account.username} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
