import Navbar from "./components/Navbar";
import CounterPage from "./pages/CounterPage";
import AccountPage from "./pages/AccountPage";
import PostPage from "./pages/PostPage";
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import { getPosts } from "./api/routes";
import { useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux'
import { setPosts } from './redux/posts'


function App() {

  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.accountReducer.loggedIn);
  let nav = loggedIn ? <Navbar /> : <Outlet />
  let redirectUser = <Navigate to="/account" />

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPosts()
        dispatch(setPosts(result.data))
      } catch (error) {
        console.log(error)
        alert("could not load data")
      }
    };
    fetchData();
  }, [dispatch]);


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={nav}>
            <Route index element={!loggedIn ?  redirectUser :  <p>Too lazy to make home page</p>} />
            <Route path="counter" element={!loggedIn ?  redirectUser :  <CounterPage />} />
            <Route path="posts" element={!loggedIn ?  redirectUser :  <PostPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="*" element={<p>Invalid Page</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
