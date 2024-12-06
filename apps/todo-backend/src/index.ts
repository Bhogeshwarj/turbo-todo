import express, { Request, Response } from "express";
import {  tasksTable } from "./schema/schema";
import { db } from "./utils/db";

// Initialize Express app
const app = express();
const port = 4000;

// Middleware to parse JSON body
app.use(express.json());

// Route to get all tasks
app.get("/tasks", async (_req: Request, res: Response) => {
  try {
    const tasks = await db
      .select()
      .from(tasksTable)
      .orderBy(tasksTable.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Route to create a new task

// app.post("/tasks", async (req: Request, res: Response) => {
//   const { title } = req.body;
//   if (!title) {
//     return res.status(400).json({ message: "Title is required" });
//   }

//   try {
//     const [task] = await dbConnection
//       .insert(tasksTable)
//       .values({ title, completed: false })
//       .returning(tasksTable.id);
//     res.status(201).json({ id: task.id, title, completed: false });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating task" });
//   }
// });
 
// Route to update task completion status

// app.patch("/tasks/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { completed } = req.body;

//   if (typeof completed !== "boolean") {
//     return res.status(400).json({ message: "Invalid value for completed" });
//   }

//   try {
//     const [updatedTask] = await dbConnection
//       .update(tasksTable)
//       .set({ completed })
//       .where(eq(tasksTable.id, Number(id)))
//       .returning();
//     res.json(updatedTask);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating task" });
//   }
// });

// Route to delete a task

// app.delete("/tasks/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     await dbConnection.delete(tasksTable).where(eq(tasksTable.id, Number(id)));
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting task" });
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
