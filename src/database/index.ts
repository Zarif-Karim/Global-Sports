import Koa from "koa";
import { createPool } from "slonik";

async function connectDB(app: Koa) {
  try {
    console.log("Establishing connection to DB");
    const username = process.env.PGUSER ?? "postgres";
    const password = process.env.PGPASSWORD ?? "example";
    const host = process.env.PGHOST ?? "db";
    const port = process.env.PGPORT ?? "5432";
    const db = process.env.PGDATABASE ?? "postgres";
    const URL = `db://${username}:${password}@${host}:${port}/${db}`;
    console.log("DB_URL", URL);
    const pool = await createPool(URL);
    app.context.db = pool;
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
    throw new Error('Connecting to DB failed!');
  }
}

export default connectDB;
