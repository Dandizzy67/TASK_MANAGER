// TaskController.ts - THE LOGIC FOR EACH TASK ENDPOINT
// Each function follows the same simple flow:
// 1. Read what we need from the request (req.body/ req.params)
// 2. Ask the database (Through the Task model)
// 3. Send back a response with a staus code + JSON

// Status codes that might be used:

// POST - Create a new task

import type { Request, Response } from "express";
import Task from "../models/task";

export const createTask = async (req: Request, res: Response) => {
  //1. Put in the fields/keys into the req.body
  const { title, description, tag } = req.body;

  // 2.save it if a field is missing
  if (!title || !description || !tag) {
    return res.status(406).json({ message: "All fields must be filled" });
  }

  // 3. Save all infromation of title, descriptions and tags in the database
  const task = await Task.create({ title, description, tag });

  // 4. 201 = created
  res.status(201).json({ message: "Task created successfully", task });
};

// GET -> Get every task

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });

  //   // GET -> Get every task
  // export const getAllTasks = async (req: Request, res: Response) => {
  //   // 1. Find and get ALL tasks from the MongoDB database
  //   //    Task.find() with empty () means no filter, so it returns everything
  //   const tasks = await Task.find();

  //   // 2. Send a 200 success response back with all the tasks
  //   res.status(200).json({ tasks });
  // };
};

// PATCH -> Update a task

export const updateTask = async (req: Request, res: Response) => {
  const { title, description, tag } = req.body;

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      tag,
    },
    {
      returnDocument: "after", // send back the task AFTER the update
      runvalidators: true, // apply the rules in the model to the updates too
    },
  );

  if (!task) {
    res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ message: "Task updated successfully", task });

  //   // PATCH -> Update a task
  // export const updateTask = async (req: Request, res: Response) => {
  //   // 1. Get the new title, description, and tag that the user sent in the request body
  //   const { title, description, tag } = req.body;

  //   // 2. Find the task by the ID from the URL (req.params.id) and update it with the new data
  //   const task = await Task.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //       title,
  //       description,
  //       tag,
  //     },
  //     {
  //       returnDocument: "after", // Send back the task AFTER the update, not the old one before it
  //       runValidators: true, // Apply the rules in the model to the updates too (e.g., tag must be urgent/important)
  //     },
  //   );

  //   // 3. If no task was found with that ID, send a 404 error
  //   if (!task) {
  //     res.status(404).json({ message: "Task not found" });
  //   }

  //   // 4. If the update was successful, send a 200 success response with the updated task
  //   res.status(200).json({ message: "Task updated successfully", task });
  // };
};

// DELETE -> Delete a task

export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.status(200).json({ message: "Task deleted successfully", task });

  //   // DELETE -> Delete a task
  // export const deleteTask = async (req: Request, res: Response) => {
  //   // 1. Find the task by the ID from the URL (req.params.id) and delete it from MongoDB
  //   //    If found, 'task' will hold the deleted document. If not found, 'task' will be null
  //   const task = await Task.findByIdAndDelete(req.params.id);

  //   // 2. If no task was found with that ID, stop and send a 404 error
  //   if (!task) {
  //     return res.status(404).json({ message: "Task not found" });
  //   }

  //   // 3. If deletion was successful, send a 200 success response with the deleted task
  //   return res.status(200).json({ message: "Task deleted successfully", task });
  // };
  //     return res.status(200).json({ message: "Task deleted successfully", task });//
};

// GET -> get one task
export const getTaskById = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  return res.status(200).json({ task });
};
