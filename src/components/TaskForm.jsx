import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      return;
    }

    onAddTask(task);
    setTask("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        placeholder="What's on your mind?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button className="add-button" type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;