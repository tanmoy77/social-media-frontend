import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './app.css';
import API from './axios';
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/proflie/Profile";
import Signup from "./pages/signup/Signup";

function App() {
  const { user } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getLoggedIn = async () => {
      try {
        await API.get("/auth/checklogin");
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    getLoggedIn();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/messenger" element={!user ? <Navigate to='/' /> : <Messenger />} />
          <Route exact path="/profile/:userId" element={<Profile />} />
          <Route
            exact
            path="/login"
            element={<Login />}
          />
          <Route
            exact
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
