import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";

const APIBaseUrl = process.env.REACT_APP_APIBASEURL;

const TaskList = () => {
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");

  const fetchTasks = () => {
    if (user?.roleName === "Admin") {
      axios.get(`${APIBaseUrl}/Tasks/GetAllTasks`)
        .then((result) => {
          const allFetchedTasks = result.data;
          setTasks(allFetchedTasks);
          setAllTasks(allFetchedTasks);

          const uniqueNames = [...new Set(allFetchedTasks.map(task => task.name))];
          setUsers(uniqueNames);
        })
        .catch((error) =>
          console.log("Error fetching all tasks:", error.message)
        );
    } else if (user?.roleName === "User") {
      axios.get(`${APIBaseUrl}/Tasks/GetTaskById/${user.userId}`)
        .then((result) => {
          setTasks(result.data);
        })
        .catch((error) =>
          console.log("Error fetching tasks by ID:", error.message)
        );
    }
  };

  const deleteTask = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    axios.delete(`${APIBaseUrl}/Tasks/DeleteTask/${id}`)
      .then(() => {
        fetchTasks();
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUserChange = (e) => {
    const selectedName = e.target.value;
    setSelectedUserId(selectedName);

    if (selectedName === "") {
      setTasks(allTasks); // Show all tasks
    } else {
      const filtered = allTasks.filter(task => task.name === selectedName);
      setTasks(filtered);
    }
  };

  const handleTaskAddedOrUpdated = () => {
    fetchTasks();
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleAddClick = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <div>
      {user?.roleName === "Admin" && (
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>
            Filter by User:
          </label>
          <select
            value={selectedUserId}
            onChange={handleUserChange}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              minWidth: "220px",
            }}
          >
            <option value="">-- All Users --</option>
            {users.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleAddClick}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          marginBottom: "15px",
          cursor: "pointer",
        }}
      >
        + Add Task
      </button>

      <table
        className="task-table"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>
        <thead>
          <tr>
            {user?.roleName === "Admin" && <th>Name</th>}
            <th>Title</th>
            <th>Description</th>
            <th>IsCompleted</th>
            <th>DueDate</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task.id || index}>
                {user?.roleName === "Admin" && <td>{task.name}</td>}
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.isCompleted ? "Yes" : "No"}</td>
                <td>{task.dueDate || "N/A"}</td>
                <td>{task.priority || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(task)}
                    style={{
                      backgroundColor: "orange",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      marginRight: "5px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={user?.roleName === "Admin" ? 7 : 6} style={{ textAlign: "center" }}>
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <TaskForm
              onClose={() => {
                setShowModal(false);
                setSelectedTask(null);
              }}
              onTaskAddedOrUpdated={handleTaskAddedOrUpdated}
              task={selectedTask}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
};

export default TaskList;
