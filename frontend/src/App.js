import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskTable from "./components/TaskTable";
import AddTaskModal from "./components/AddTaskModal";
import DeleteAllTasksModal from "./components/DeleteAllTasksModal"; 
import { ToastContainer } from "react-toastify";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to control the Delete All Modal

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen); // Toggle the Delete Modal
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gray-50 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center font-bold my-5 text-4xl sm:text-5xl text-gray-800">Task Dashboard</h1>
      <ToastContainer />

      <div className="rounded-lg bg-white shadow-lg mb-6 w-full max-w-7xl">
        <div className="p-3 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex space-x-3">
            <button
              onClick={toggleAddModal}
              className="px-6 py-2 font-semibold rounded-lg bg-blue-500 text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add New Task
            </button>
          </div>

          <div className="flex space-x-2 w-full sm:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search tasks..."
              className="px-4 py-2 border rounded-lg w-full sm:w-80"
            />
          </div>
          <button
            onClick={toggleDeleteModal} 
            className="px-6 py-2 font-semibold rounded-lg bg-red-500 text-white shadow-md transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete All Tasks
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-full">
            <TaskTable tasks={filteredTasks} setTasks={setTasks} /> {/* Pass filtered tasks */}

            {isAddModalOpen && (
              <AddTaskModal toggleModal={toggleAddModal} setTasks={setTasks} />
            )}
            {isDeleteModalOpen && (
              <DeleteAllTasksModal
                isOpen={isDeleteModalOpen}
                toggleModal={toggleDeleteModal}
                setTasks={setTasks}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
