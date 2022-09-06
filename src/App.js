import Navbar from "./components/Navbar";
import MyCard from "./components/MyCard";
import CounterPage from "./pages/CounterPage";
import PostPage from "./pages/PostPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<MyCard text="Home Page" />} />
            <Route path="counter" element={<CounterPage />} />
            <Route path="posts" element={<PostPage />} />
            <Route path="*" element={<p>Invalid Page</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
