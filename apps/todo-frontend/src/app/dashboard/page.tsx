"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";


interface Task {
  id: string;
  title: string;
  completed: boolean;
}

function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");


  const addTask = () => {
    if (newTask.trim() === "") return; 
    const task: Task = { id: Date.now().toString(), title: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask(""); 
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">


        <div className="flex items-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={addTask}>Add Task</Button>
        </div>

        <div>
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks added yet</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between px-4 py-2 mb-2 rounded-lg ${
                  task.completed ? "bg-green-100 " : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span className={task.completed ? "text-gray-500" : ""}>{task.title}</span>
                </div>
                <Button  className="bg-white text-black border border-gray-300 rounded-lg px-4 py-2 hover:bg-red-600 hover:text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
  onClick={() => deleteTask(task.id)}
>
  Delete
</Button>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
