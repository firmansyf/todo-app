import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import "./App.scss";
import DetailActivity from "./page/DetailActivity";
import Logo from "./assets/icon/watermak-logo.png";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="navbar sticky-top shadow-sm" style={{ height: "100px" }}>
        <div className="mx-5 d-flex align-items-center section-header">
          <div className="logo">
            <img src={Logo} alt="logo" style={{ width: 45 }} />
          </div>
          <div className="">TO DO APP</div>
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/detail/:id" element={<DetailActivity />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
      <ToastContainer limit={1} />
    </>
  );
}

export default App;
