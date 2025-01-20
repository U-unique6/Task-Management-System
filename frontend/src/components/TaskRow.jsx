import React, { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import { Edit, Trash2 } from "lucide-react";

const TaskRow = ({ task, updateStatus, deleteTask, onEdit }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEdit = (updatedTask) => {
    onEdit(updatedTask);
  };

  return (
    <>
      <tr className="border-b hover:bg-gray-50">
        <td className="px-4 py-2 text-gray-700">{task.id}</td>
        <td className="px-4 py-2 text-gray-700">{task.name}</td>
        <td className="px-4 py-2">
          <select
            value={task.status}
            onChange={(e) => updateStatus(task.id, e.target.value)}
            className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white shadow-sm"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </td>
        <td className="px-4 py-2 text-center flex align-center items-center justify-center space-x-3">
          <Edit
            className="cursor-pointer"
            onClick={() => setEditModalOpen(true)}
          ></Edit>

          <Trash2
            className="text-red-700 cursor-pointer hover:text-red-800"
            onClick={deleteTask}
          />
        </td>
      </tr>

      <EditTaskModal
        isOpen={isEditModalOpen}
        task={task}
        onSave={handleEdit}
        onClose={() => setEditModalOpen(false)}
      />
    </>
  );
};

export default TaskRow;
