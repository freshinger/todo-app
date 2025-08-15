import { NextApiRequest, NextApiResponse } from 'next';
import {Tasks} from '../../../db/models/tasks'; 
import dbConnect from '../../../db/connect';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const db = await dbConnect();

  if (request.method === "GET") {
    const tasks = await Tasks.findAll({ where: { completed: true }});
    return response.status(200).json(tasks);
  }
}
