import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/db/connect';
import {Tasks} from '@/db/models/tasks';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const db = await dbConnect();

  if (request.method === "GET") {
    const tasks = await Tasks.findAll({ where: { completed: false }});
    return response.status(200).json(tasks);
  }
}
