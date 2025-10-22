import React, { useState, useEffect } from "react";
import axios from "axios";
const APIBaseUrl = process.env.REACT_APP_APIBASEURL;

const TaskForm = ({ onClose, onTaskAddedOrUpdated, task }) => {
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    description: "",
    isCompleted: false,
    dueDate: "",
    priority: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        dueDate: task.dueDate,
        priority: task.priority,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

const AddTask = () => {
  const data = {
    title: formData.title,
    description: formData.description,
    isCompleted: formData.isCompleted ? "1" : "0",
    dueDate: formData.dueDate,
    priority: formData.priority,
    userId: JSON.parse(sessionStorage.getItem("user")).userId,
  };

  axios.post(`${APIBaseUrl}/Tasks/CreateTask`, data)
    .then((res) => {
      console.log("Task Added:", res.data);
      onTaskAddedOrUpdated?.();
      onClose(); 
    })
    .catch((err) => {
      console.error("Error adding task:", err.message);
    });
};

const UpdateTask = () => {
   
  const data = {
    id: task?.id,
    title: formData.title,
    description: formData.description,
    isCompleted: formData.isCompleted ? "1" : "0",
    dueDate: formData.dueDate,
    priority: formData.priority,
    userId: ''
  };

  axios.put(`${APIBaseUrl}/Tasks/UpdateTask`, data)
    .then((res) => {
      console.log("Task Updated:", res.data);
      onTaskAddedOrUpdated?.(); 
      onClose();
    })
    .catch((err) => {
      console.error("Error updating task:", err.message);
    });
};

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        {task ? "Update Task" : "Add Task"}
      </h2>

        <div style={{ marginBottom: "10px" }}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "90%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: "90%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="isCompleted"
              checked={formData.isCompleted}
              onChange={handleChange}
            />{" "}
            Completed
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            style={{ width: "90%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Priority:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            style={{ width: "95%", padding: "8px" }}
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => task ? UpdateTask() : AddTask()}
        style={{
            backgroundColor: task ? "orange" : "green",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
        }}
        >
        {task ? "Update" : "Add"}
        </button>


          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: "gray",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
    </div>
  );
};

export default TaskForm;
