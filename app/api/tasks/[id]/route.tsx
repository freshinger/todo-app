import { pool } from "@/db/pg_pool";
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, {
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const {id} = await params;

    if (!id) {
        return;
    }

    await pool.query<Task>("DELETE FROM \"Tasks\" WHERE id = $1", [id])

    return NextResponse.json({ message: "Success!" });
}

export async function PUT(request: Request, {
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const {id} = await params;
    
    const req = await request.json();
    
    if (!id) {
        return NextResponse.json({ status: "Invalid Id" });
    }

    const task = (await pool.query<Task>("SELECT * FROM \"Tasks\" WHERE id = $1", [id])).rows[0]

    if (!task) {
      
      return NextResponse.json({ status: "Task not found" });
    }

    await pool.query<Task>("UPDATE \"Tasks\" SET title = $1 WHERE id = $2", [req.title, id])

    return NextResponse.json({
      status: `Task ${id} was successfully edited!`,
    });
}

export async function PATCH(request: Request, {
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const {id} = await params;
    
    if (!id) {
        return NextResponse.json({ status: "Invalid Id" });
    }
    const task = (await pool.query<Task>("SELECT * FROM \"Tasks\" WHERE id = $1", [id])).rows[0]

    if (!task) {
      return NextResponse.json({ status: "Task not found" });
    }

    await pool.query<Task>("UPDATE \"Tasks\" SET completed = $1 WHERE id = $2", [!task.completed, id])

    return NextResponse.json(task);
}
