import { useRef, useState } from "react";
import axios from "axios";
import "./signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const confirmPasswordInput = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const API = process.env.REACT_APP_BACKEND_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      confirmPasswordInput.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username,
        email,
        password,
      };
      try {
        await axios.post(`${API}/auth/register`, user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div class="signup">
      <h2 className="logo">Golpo</h2>
      <div className="signupWrapper">
        <h3>Register</h3>
        <form className="signupForm" onSubmit={handleSubmit}>
          <div className="formItem">
            <span>Username</span>
            <input
              type="text"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="formItem">
            <span>Email</span>
            <input
              type="email"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formItem">
            <span>Password</span>
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="formItem">
            <span>Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              placeholder="type password again"
              onChange={(e) => setConfirmPassword(e.target.value)}
              ref={confirmPasswordInput}
              required
            />
          </div>
          <input className="submitButton" type="submit" />
        </form>
        <hr />
        <p className="spanText">already has an account? Log in </p>
      </div>
    </div>
  );
};

export default Signup;
