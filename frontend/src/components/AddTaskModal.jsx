import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast } from "react-toastify";

function AddTaskModal({ toggleModal, setTasks }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Pending");

  // Submit new task
  const addTask = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/tasks", { name, status })
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        toast.success("Task added successfully!");
        toggleModal();
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        toast.error("Failed to add task!");
      });
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={toggleModal}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Add New Task</h2>
        <form onSubmit={addTask}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status:
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={toggleModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg shadow hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddTaskModal;
