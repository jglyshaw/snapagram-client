import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import AllPosts from "./pages/AllPosts";
import AccountPage from "./pages/AccountPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import { getAllPosts, getPosts } from "./api/routes";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { setPosts, setUserPosts } from './redux/posts'


function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'));
  const [loggedIn, setLoggedIn] = useState(user ? true : false)
  const redirectUser = <Navigate to="/login" />

  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await getAllPosts()
        const userResult = await getPosts(user.account._id)
        dispatch(setPosts(result.data))
        dispatch(setUserPosts(userResult.data))
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  });


  return (
    <div>
      <BrowserRouter>
        {loggedIn ? <Navbar setLoggedIn={setLoggedIn}/> : <></>}
        <Routes>
          <Route index element={!loggedIn ? redirectUser : <p>Too lazy to make home page</p>} />
          <Route path="posts" element={!loggedIn ? redirectUser : <PostPage />} />
          <Route path="allposts" element={!loggedIn ? redirectUser : <AllPosts />} />
          <Route path="account" element={!loggedIn ? redirectUser : <AccountPage />} />
          <Route path="login" element={<LoginPage setLoggedIn = {setLoggedIn}/>} />
          <Route path="*" element={<p>Invalid Page</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
