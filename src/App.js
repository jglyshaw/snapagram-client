import Navbar from "./components/Navbar";
import CounterPage from "./pages/CounterPage";
import PostPage from "./pages/PostPage";
import { Outlet, Link } from "react-router-dom";
import { getPosts } from "./api/api";
import { useEffect } from "react";
import { useDispatch  } from 'react-redux'
import { setPosts } from './redux/posts'

import AccountPage from "./pages/AccountPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const dispatch = useDispatch()

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

  // let element = account ? <Navbar /> : <Outlet />
  let element = <Navbar />

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={element}>
            <Route index element={<p>Too lazy to make home page</p>} />
            <Route path="counter" element={<CounterPage />} />
            <Route path="posts" element={<PostPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="*" element={<p>Invalid Page</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
