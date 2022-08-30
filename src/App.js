import Navbar from "./components/Navbar";
import MyCard from "./components/MyCard";
import CounterPage from "./pages/CounterPage";
import ShoppingPage from "./pages/ShoppingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div style = {{padding: "5px"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<MyCard text="Home Page" />} />
            <Route path="user" element={<MyCard text="User Page" />} />
            <Route path="counter" element={<CounterPage />} />
            <Route path="shopping" element={<ShoppingPage />} />
            <Route path="*" element={<p>Invalid Page</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
