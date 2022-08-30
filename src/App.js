import Navbar from "./components/Navbar";
import MyCard from "./components/MyCard";
import Text from "./components/Text";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Text />} />
            <Route path="user" element={<MyCard text="User Page" />} />
            <Route path="contact" element={<MyCard text="stupid" />} />
            <Route path="*" element={<p>Invalid Page</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
