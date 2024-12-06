"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
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
        {/* Input Section */}
        <div className="flex items-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button onClick={addTask}>Add Task</Button>
          </motion.div>
        </div>

        {/* Task List */}
        <div>
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks added yet</p>
          ) : (
            <motion.div layout>
              <AnimatePresence>
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center justify-between px-4 py-2 mb-2 rounded-lg ${
                      task.completed ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                   
<div className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={task.completed}
    onChange={() => toggleTaskCompletion(task.id)}
  />
  <motion.span
    initial={{ opacity: 0.5 }}
    animate={{ opacity: task.completed ? 0.5 : 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className={`transition-all ${
      task.completed ? "text-gray-500 line-through" : ""
    }`}
  >
    {task.title}
  </motion.span>
</div>
                    <motion.div
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <Button
    className="bg-white text-black border border-gray-300 rounded-lg px-4 py-2 hover:bg-red-600 hover:text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
    onClick={() => deleteTask(task.id)}
  >
    Delete
  </Button>
</motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
