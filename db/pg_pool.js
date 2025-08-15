import pg from "pg";

export const pool = new pg.Pool({
    host: process.env.PG_HOST || "localhost",
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});