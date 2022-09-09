import Navbar from "./components/Navbar";
import CounterPage from "./pages/CounterPage";
import PostPage from "./pages/PostPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<p>Too lazy to make home page</p>} />
            <Route path="counter" element={<CounterPage />} />
            <Route path="posts" element={<PostPage />} />
            <Route path="account" element={<p>Account page</p>} />
            <Route path="*" element={<p>Invalid Page</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
