"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, X } from "lucide-react";

export function QuickTaskModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset form when opening
      setTaskTitle("");
      setDueDate("");
      setPriority("Medium");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally save the task to the database
    console.log("Creating task:", { taskTitle, dueDate, priority });
    
    // Show success notification
    alert("Task created successfully!");
    
    // Close the modal
    toggleModal();
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={toggleModal}
        className="fixed z-50 bottom-6 right-6 rounded-full w-14 h-14 shadow-lg flex items-center justify-center bg-blue-800 hover:bg-blue-700"
        aria-label="Add task"
      >
        <PlusIcon className="h-6 w-6" />
      </Button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          {/* Modal Content */}
          <div className="bg-background rounded-lg w-full max-w-md p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Quick Add Task</h2>
              <Button variant="ghost" size="icon" onClick={toggleModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="What needs to be done?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-2">
                <Button type="button" variant="outline" onClick={toggleModal}>
                  Cancel
                </Button>
                <Button type="submit">Create Task</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 