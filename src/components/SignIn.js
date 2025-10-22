import React, { useState,useContext  } from 'react';
import '../style/SignIn.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const APIBaseUrl = process.env.REACT_APP_APIBASEURL;

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const Login = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password");
      return;
    }

    const data = {
      email: formData.email,
      passwordHash: formData.password,
    };

    axios.post(`${APIBaseUrl}/Login/UserLogin`, data)
      .then((res) => {
         
        console.log("Login Details:", res.data);
        setUser(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        navigate("/TaskList");
      })
      .catch((err) => {
        console.error("Error logging in:", err.message);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="heading">Sign-In</h2>

        <div>
          <div className="inputGroup">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <button type="button" className="button" onClick={Login}>
            Log in
          </button>
        </div>

        <p className="signupText">
          Don't have an account? <a href="/SignUpForm" className="signupLink">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
