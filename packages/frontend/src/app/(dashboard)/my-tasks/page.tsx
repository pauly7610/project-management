"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Calendar, Filter, CheckCircle2, ArrowUpDown } from "lucide-react";

export default function MyTasksPage() {
  const [filter, setFilter] = useState("all");
  
  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: "Finalize Q2 planning document",
      dueDate: "2023-04-25",
      priority: "High",
      status: "In Progress",
      project: "Strategic Planning"
    },
    {
      id: 2,
      title: "Prepare slides for team presentation",
      dueDate: "2023-04-26",
      priority: "Medium",
      status: "Not Started",
      project: "Marketing Campaign"
    },
    {
      id: 3,
      title: "Review product feedback from beta users",
      dueDate: "2023-04-28",
      priority: "High",
      status: "In Progress",
      project: "Product Launch"
    },
    {
      id: 4,
      title: "Update project roadmap with new features",
      dueDate: "2023-05-01",
      priority: "Medium",
      status: "Not Started",
      project: "Product Development"
    },
    {
      id: 5,
      title: "Meet with design team about UI improvements",
      dueDate: "2023-04-27",
      priority: "Low",
      status: "Completed",
      project: "UI Redesign"
    }
  ];

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "completed") return task.status === "Completed";
    if (filter === "in-progress") return task.status === "In Progress";
    if (filter === "not-started") return task.status === "Not Started";
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Task
        </Button>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button 
            variant={filter === "in-progress" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("in-progress")}
          >
            In Progress
          </Button>
          <Button 
            variant={filter === "completed" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
          <Button 
            variant={filter === "not-started" ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter("not-started")}
          >
            Not Started
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 size-4" />
            Due Date
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 size-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="mr-2 size-4" />
            Sort
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="py-10">
              <div className="flex flex-col items-center text-center">
                <CheckCircle2 className="size-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-1">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  {filter === "all" 
                    ? "You don't have any tasks right now. Create one to get started."
                    : `You don't have any ${filter.replace('-', ' ')} tasks.`
                  }
                </p>
                <Button>
                  <Plus className="mr-2 size-4" />
                  Create New Task
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{task.title}</h3>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{task.project}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full font-medium
                      ${task.priority === 'High' ? 'bg-red-100 text-red-700' : ''}
                      ${task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : ''}
                      ${task.priority === 'Low' ? 'bg-green-100 text-green-700' : ''}
                    `}>
                      {task.priority}
                    </span>
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full font-medium
                      ${task.status === 'Completed' ? 'bg-green-100 text-green-700' : ''}
                      ${task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : ''}
                      ${task.status === 'Not Started' ? 'bg-gray-100 text-gray-700' : ''}
                    `}>
                      {task.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 