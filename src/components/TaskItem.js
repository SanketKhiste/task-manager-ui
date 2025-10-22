import React from 'react'

const TaskItem = ({ task, onDelete }) => {
  return (
    <li className="task-item">
      <span>{task}</span>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default TaskItem