import { pool } from '@/db/pg_pool';
import { NextResponse } from 'next/server';

export async function GET() {
  const tasks = (await pool.query<Task>('SELECT * FROM "Tasks" WHERE completed = true ORDER BY created_at DESC')).rows;
  return NextResponse.json(tasks);
}