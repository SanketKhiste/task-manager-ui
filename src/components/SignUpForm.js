import React, { useState } from 'react';
import '../style/SignUpForm.css';
import axios from "axios";
const APIBaseUrl = process.env.REACT_APP_APIBASEURL;

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' // default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    axios.post(`${APIBaseUrl}/SignUp/Register`, data)
      .then((res) => {
        console.log("Register:", res.data);
      })
      .catch((err) => {
        console.error("Error registering user:", err.message);
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="input-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="signup-button">Sign Up</button>
        <p className="login-link">
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
