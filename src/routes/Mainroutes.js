import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../components/SignIn';
import TaskList from '../components/TaskList';
import SignUpForm from '../components/SignUpForm';
import UsersDashboard from '../components/UsersDashboard';

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/SignUpForm" element={<SignUpForm />} />
      <Route path="/tasklist" element={<TaskList />} />
      <Route path="/UsersDashboard" element={<UsersDashboard />} />
    </Routes>
  );
};

export default Mainroutes;