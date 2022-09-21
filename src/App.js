import Navbar from "./components/Navbar";
import CounterPage from "./pages/CounterPage";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import AllPosts from "./pages/AllPosts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import { getAllPosts, getPosts } from "./api/routes";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { setPosts, setUserPosts } from './redux/posts'


function App() {
  const dispatch = useDispatch()
  const [loggedIn2, setLoggedIn] = useState(false)
  let user = JSON.parse(localStorage.getItem('profile'));
  let loggedIn = user ? true : false;
  let redirectUser = <Navigate to="/login" />
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
        {loggedIn ? <Navbar loggedIn={loggedIn2} setLoggedIn={setLoggedIn}/> : <></>}
        <Routes>
          <Route index element={!loggedIn ? redirectUser : <p>Too lazy to make home page</p>} />
          <Route path="counter" element={!loggedIn ? redirectUser : <CounterPage />} />
          <Route path="posts" element={!loggedIn ? redirectUser : <PostPage />} />
          <Route path="allposts" element={!loggedIn ? redirectUser : <AllPosts />} />
          <Route path="login" element={<LoginPage loggedIn={loggedIn2} setLoggedIn = {setLoggedIn}/>} />
          <Route path="*" element={<p>Invalid Page</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
