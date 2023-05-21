import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import API from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({ usernameOrEmail, password }, dispatch, navigate);
  };

  useEffect(() => {
    const getLoggedIn = async () => {
      try {
        await API.get("/auth/checklogin");
        setIsLoggedIn(true);
        if (user) {
          navigate("/");
        }
      } catch (err) {}
    };
    getLoggedIn();
  }, []);

  return (
    <div className="login">
      <h2 className="logo">Golpo</h2>
      <div className="loginWrapper">
        <h3>Log in</h3>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="formItem">
            <span>Email</span>
            <input
              type="text"
              value={usernameOrEmail}
              placeholder="email"
              required
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
          </div>
          <div className="formItem">
            <span>Password</span>
            <input
              type="password"
              value={password}
              required
              minLength="6"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="submitButton" type="submit" disabled={isFetching}>
            {isFetching ? (
              <CircularProgress color="inherit" size="10px" />
            ) : (
              "login"
            )}
          </button>
        </form>
        <hr />
        <p className="spanText">don't have an account? Sign up </p>
      </div>
    </div>
  );
};

export default Login;
