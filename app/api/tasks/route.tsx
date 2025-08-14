import { pool } from "@/db/pg_pool";
import { NextResponse } from 'next/server';

export async function GET() {
    const result = await pool.query<Task>("SELECT * FROM \"Tasks\" ORDER BY created_at DESC")
    const tasks = result.rows

    return NextResponse.json(tasks);
}

export async function POST(request: Request) {
    try {
      const { title: taskTitle } = await request.json();
      const result = await pool.query<Task>("INSERT INTO \"Tasks\" (title) VALUES ($1)", [taskTitle])
      const record = result.rows[0]

      return NextResponse.json(record);
    } catch (error) {
      console.error(error);

      return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  
}
