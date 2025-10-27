import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../style/UsersDashboard.css';

const APIBaseUrl = process.env.REACT_APP_APIBASEURL;

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = user?.token;

    axios.get(`${APIBaseUrl}/Users/UsersDetails`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        if (result.data.isSuccess) {
          setUsers(result.data.responseObject);
        } else {
          setErrorMessage(result.data.message || "API error occurred.");
        }
        setLoading(false);
      })
      .catch(error => {
        if (error.response?.status === 403) {
          setErrorMessage("Access Blocked. Your account doesn’t have a role assigned. Please contact your administrator.");
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="users-container">
      <h2>Users Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersDashboard;
