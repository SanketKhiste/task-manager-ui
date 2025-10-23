import React, { useState } from 'react';
import '../style/SignUpForm.css';
import axios from "axios";

const APIBaseUrl = process.env.REACT_APP_APIBASEURL;

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleRegisterClick = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    axios.post(`${APIBaseUrl}/SignUp/Register`, data)
      .then((res) => {
        console.log("Register:", res.data);
        setSuccessMessage("Registration successful!");

        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'user'
        });
      })
      .catch((err) => {
        const serverMessage = err.response?.data?.message || err.message;
        console.error("Error registering user:", serverMessage);
        setErrorMessage("Registration failed: " + serverMessage);
      });
  };

  return (
    <div className="signup-container">
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
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <button className="signup-button" onClick={handleRegisterClick}>
        Sign Up
      </button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <p className="login-link">
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
};

export default SignUpForm;
