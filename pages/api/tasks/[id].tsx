import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/db/connect';
import { Tasks } from '@/db/models/tasks';
import { useRouter } from 'next/router';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const id = request.query.id;
  console.log(id);
  if (!id) {
    return;
  }
  const db = await dbConnect();

  if (request.method === "DELETE") {
    const task = await Tasks.findByPk(id);
    task?.destroy();
    response.status(200).json({ message: "Success!" });
  }

  if (request.method === "PUT") {
    const task = await Tasks.findByPk(id.toString());

    if (!task) {
      response.status(404).json({ status: "Task not found" });
      return;
    }

    task.title = request.body.title;

    await task.save();

    response.status(200).json({
      status: `Task ${id} was successfully edited!`,
    });
  }

  if (request.method === "PATCH") {
    const task = await Tasks.findByPk(id.toString());

    if (!task) {
      response.status(404).json({ status: "Task not found" });
      return;
    }

    task.completed = !task.completed; 
    
    await task.save();
    console.log(task);
    response.status(200).json(task);
  }
}
