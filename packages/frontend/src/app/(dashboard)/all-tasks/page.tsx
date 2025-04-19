"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Plus, Filter, SlidersHorizontal } from "lucide-react";

export default function AllTasksPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock task data
  const tasks = [
    {
      id: 1,
      title: "Complete project proposal",
      assignee: "John Doe",
      dueDate: "Apr 20, 2025",
      priority: "High",
      isPrivate: false
    },
    {
      id: 2,
      title: "Review client feedback",
      assignee: "Jane Smith",
      dueDate: "Apr 18, 2025",
      priority: "Medium",
      isPrivate: false
    },
    {
      id: 3,
      title: "Schedule team meeting",
      assignee: "John Doe",
      dueDate: "Apr 15, 2025",
      priority: "Low",
      isPrivate: true
    },
    {
      id: 4,
      title: "Update project timeline",
      assignee: "Jane Smith",
      dueDate: "Apr 25, 2025",
      priority: "High",
      isPrivate: false
    },
    {
      id: 5,
      title: "Prepare presentation",
      assignee: "John Doe",
      dueDate: "Apr 28, 2025",
      priority: "High",
      isPrivate: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Tasks</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <User className="mr-2 h-4 w-4" />
            Assign
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {["All", "Not Started", "Pending", "In Progress", "Completed"].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter.toLowerCase().replace(" ", "-") ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.toLowerCase().replace(" ", "-"))}
            >
              {filter}
            </Button>
          ))}
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Tasks list */}
      <div>
        <div className="mb-2">
          <h2 className="text-md font-medium">All Tasks ({tasks.length})</h2>
        </div>
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: any }) {
  const priorityColors = {
    High: "text-red-500 bg-red-50",
    Medium: "text-orange-500 bg-orange-50",
    Low: "text-green-500 bg-green-50"
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-center px-4 py-3">
          <div className="flex-shrink-0 mr-3">
            <input type="checkbox" className="rounded border-gray-300 h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium">{task.title}</h3>
              {task.isPrivate && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  Private
                </span>
              )}
            </div>
            <div className="flex text-xs text-muted-foreground mt-1 items-center">
              <span>
                <span className="font-medium text-gray-600">Assignee:</span> {task.assignee}
              </span>
              <span className="mx-2">•</span>
              <span>
                <span className="font-medium text-gray-600">Due:</span> {task.dueDate}
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded font-medium 
              ${priorityColors[task.priority as keyof typeof priorityColors]}`}
            >
              {task.priority}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 