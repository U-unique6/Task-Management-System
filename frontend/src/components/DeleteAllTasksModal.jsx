import React from "react";
import { toast } from "react-toastify";
import axios from "axios";

function DeleteAllTasksModal({ isOpen, toggleModal, setTasks }) {
  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete("http://localhost:5000/tasks");

      if (response.status === 200) {
        setTasks([]);
        toast.success("All tasks deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting tasks:", error);
      toast.error("Failed to delete tasks. Please try again.");
    }
    toggleModal();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold text-center mb-4">
            Delete All Tasks
          </h2>
          <p className="text-center mb-4">
            Are you sure you want to delete all tasks? This action cannot be
            undone.
          </p>
          <div className="flex justify-between">
            <button
              onClick={toggleModal}
              className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAll}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Delete All
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default DeleteAllTasksModal;
