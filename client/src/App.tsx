import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import CoverPage from "./pages/CoverPage";
import NotFound from "./pages/NotFound";
import EditTask from "./pages/EditTask";
import MyTask from "./pages/MyTask";
import NewTask from "./pages/NewTask";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/tasks" element={<MyTask />} />
        <Route path="/new" element={<NewTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
