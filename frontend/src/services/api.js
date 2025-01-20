import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // Your backend URL
});

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await API.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

// Add a new task
export const addTask = async (taskData) => {
  try {
    const response = await API.post("/tasks", taskData);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// Update task status
export const updateTaskStatus = async (id, status) => {
  try {
    const response = await API.put(`/tasks/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await API.delete(`/tasks/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
