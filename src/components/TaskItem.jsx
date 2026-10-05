import { useState } from "react";

function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    if (editedText.trim() === "") {
      return;
    }

    onEditTask(task.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />

      {isEditing ? (
        <>
          <input
            className="edit-input"
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />

          <div className="task-actions">
            <button
              className="save-button"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <span
            className={`task-text ${
              task.completed ? "completed" : ""
            }`}
          >
            {task.text}
          </span>

          <div className="task-actions">
            <button
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="delete-button"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;