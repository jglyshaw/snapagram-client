import Navbar from "./components/Navbar";
import CounterPage from "./pages/CounterPage";
import PostPage from "./pages/PostPage";
import { Outlet, Link } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'

function App() {

  const account = useSelector((state) => state.account.value)

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
            <Route path="account" element={<AccountPage/ >} />
            <Route path="*" element={<p>Invalid Page</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
