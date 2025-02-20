// Local Pages
import LoginPage   from "./pages/LoginPage";
import PostPage    from "./pages/PostPage";
import AllPosts    from "./pages/AllPosts";
import AccountPage from "./pages/AccountPage";
import UserPage    from "./pages/UserPage";
import PostView    from "./pages/PostView";

// Local Components
import Navbar from "./components/Navbar";

// Local APIs
import { getAllPosts } from "./api/routes";

// External MUI Imports
import { Snackbar } from '@mui/material/';

// External Imports
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { setPosts, setUserPosts } from './redux/posts'
import { setShow } from './redux/snack'


function App() {

  // --- Local Variables --- //
  const user = JSON.parse(localStorage.getItem('profile'));

  // --- React Hooks --- //
  const [loggedIn, setLoggedIn] = useState(user ? true : false)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllPosts()
        const userPosts = result.data.filter((item) => item.creatorID === user.account._id)
        dispatch(setPosts(result.data))
        dispatch(setUserPosts(userPosts))
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [dispatch, user]);


  // --- Sub Components --- //
  const redirectUser = <Navigate to="/login" />


  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <Snackbar
        open={useSelector((state) => state.snackReducer.showSnack)}
        onClose={() => dispatch(setShow(false))}
        autoHideDuration={2000}
        message={useSelector((state) => state.snackReducer.value)}
      />

      <BrowserRouter>
        {loggedIn ? <Navbar setLoggedIn={setLoggedIn} /> : <></>}
        <Routes>
          <Route index element={!loggedIn ? redirectUser : <p>Too lazy to make home page</p>} />
          <Route path="login"         element={<LoginPage setLoggedIn={setLoggedIn} />} />
        
          {/* Redirect the user to login if not signed in yet */}
          <Route path="my-posts"      element={!loggedIn ? redirectUser : <PostPage />} />
          <Route path="all-posts"     element={!loggedIn ? redirectUser : <AllPosts />} />
          <Route path="account/:user" element={!loggedIn ? redirectUser : <AccountPage />} />
          <Route path="post/:postId"  element={!loggedIn ? redirectUser : <PostView />} />
          <Route path="user/:userID"  element={!loggedIn ? redirectUser : <UserPage />} />
  
          <Route path="*"             element={<p>Invalid Page</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
