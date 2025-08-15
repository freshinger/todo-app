import { Sequelize } from "sequelize";

async function dbConnect(): Promise<Sequelize> {
  const user = process.env.PG_USER;
  const password = process.env.PG_PASSWORD;
  const database = process.env.PG_DATABASE;
  const host = process.env.PG_HOST;
  return new Sequelize(`postgres://${user}:${password}@${host}:5432/${database}`)
}

export default dbConnect;