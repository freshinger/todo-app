import { NextApiRequest, NextApiResponse } from 'next';
import {Tasks} from '@/db/models/tasks';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "GET") {
    const tasks = await Tasks.findAll();
    return response.status(200).json(tasks);
  }

  if (request.method === "POST") {
    try {
      const taskTitle = request.body.title;
      const task = new Tasks();
      task.title = taskTitle;
      const record = await task.save();
      return response.status(201).json(record);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  }
}
