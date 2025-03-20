import React, { useState, useContext } from "react";
import { CardsContext } from "../store/context";

export const EditTaskModal = ({ card, onClose }) => {
  const { setCards } = useContext(CardsContext);
  const [formData, setFormData] = useState({
    title: card.title,
    assignee: card.assignee,
    status: card.status,
    start: card.start,
    end: card.end,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCards((prev) =>
      prev.map((c) =>
        c.id === card.id
          ? { ...c, ...formData, column: formData.status.toLowerCase() }
          : c
      )
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="to-do">To-Do</option>
              <option value="information">General Information</option>
              <option value="progressing">In Progress</option>
              <option value="paused">Paused</option>
              <option value="complete">Ready to Launch</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              id="start"
              type="date"
              value={formData.start}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              id="end"
              type="date"
              value={formData.end}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-neutral-400 hover:text-neutral-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};