
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className={'container'}>
          <Header />
          <Routes>
            <Route path={'/'} element={<DashboardPage />} />
            <Route path={'/register'} element={<RegisterPage />} />
            <Route path={'/login'} element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
