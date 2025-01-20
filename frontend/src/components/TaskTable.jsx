import React, { useState } from "react";
import TaskRow from "./TaskRow";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";

function TaskTable({ tasks, setTasks }) {
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleEdit = async (updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/${updatedTask.id}`,
        updatedTask
      );

      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? response.data : task
          )
        );
        toast.success("Task updated successfully!");
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const handleDelete = async (Task) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/tasks/${Task.id}`
      );

      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== Task.id));

        toast.success("Task deleted successfully!");
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const showDeleteModal = (task) => {
    setTaskToDelete(task);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  return (
    <div className="p-4 rounded-lg bg-white border border-gray-300 shadow-lg table-wrapper">
      <table className="w-full border-collapse table-auto text-sm text-gray-700 text-center">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
            <th className="px-2 py-2 border">ID</th>
            <th className="px-2 py-2 border">Name</th>
            <th className="px-2 py-2 border">Status</th>
            <th className="px-2 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {tasks.length === 0 ? (
            <div className="flex justify-center items-center text-center font-bold text-xl text-gray-600 my-5">
              No Tasks Available
            </div>
          ) : (
            tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                updateStatus={(id, status) =>
                  setTasks((prevTasks) =>
                    prevTasks.map((t) => (t.id === id ? { ...t, status } : t))
                  )
                }
                deleteTask={() => showDeleteModal(task)}
                onEdit={handleEdit}
              />
            ))
          )}
        </tbody>
      </table>

      {/* Delete Modal */}
      <DeleteModal
        show={showModal}
        task={taskToDelete}
        onDelete={handleDelete}
        onClose={closeDeleteModal}
      />
    </div>
  );
}

export default TaskTable;
