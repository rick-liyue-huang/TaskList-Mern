import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HeaderComponent from "./components/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
     <Router>
       <div className="container">
         <HeaderComponent />
         <Routes>
           <Route path={'/'} element={<Home />} />
           <Route path={'/login'} element={<LoginPage />} />
           <Route path={'/register'} element={<RegisterPage />} />
         </Routes>
         <ToastContainer />
       </div>
     </Router>
    </>
  );
}

export default App;
