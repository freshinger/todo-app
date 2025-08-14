import { NextResponse } from 'next/server';
import { pool } from '@/db/pg_pool';

export async function GET() {
    const tasks = (await pool.query<Task>('SELECT * FROM \"Tasks\" WHERE completed = false ORDER BY created_at DESC')).rows
    return NextResponse.json(tasks);
}
