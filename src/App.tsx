import { Routes, Route } from "react-router-dom";
import Todo from "@/page/todo";
import { Detail } from "@/page/detail-todo";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
