import { useEffect,useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");

  return savedTasks ? JSON.parse(savedTasks) : [];
});
  const [filter, setFilter] = useState("all");
  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const handleAddTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  const handleToggleComplete = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleEditTask = (taskId, updatedText) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, text: updatedText }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  return (
    <div className="app">
      <div className="container">

        <h1 className="animated-title">
  {"Build. Do. Done.".split("").map((letter, index) => (
    <span key={index}>
      {letter === " " ? "\u00A0" : letter}
    </span>
  ))}
</h1>

        <TaskForm onAddTask={handleAddTask} />

        <div className="filters">
          <button
            className={`filter-button ${
              filter === "all" ? "active" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`filter-button ${
              filter === "active" ? "active" : ""
            }`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={`filter-button ${
              filter === "completed" ? "active" : ""
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
         
        <h2 className="task-section-title">
  {filter === "active"
    ? "Oops! go ahead.."
  
    : filter === "completed"
    ? "yay! Good Job!"  
    : ""}
</h2> 
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-message">
              No tasks found. Add a task to get started!
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;