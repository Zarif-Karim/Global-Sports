import Koa from "koa";
import { createPool } from "slonik";
import { getDBEnvVar } from "./utils";

async function connectDB(app: Koa) {
  try {
    console.log("Establishing connection to DB");
    const username = getDBEnvVar('DB_USER'); 
    const password = getDBEnvVar('DB_PASSWORD');
    const host = getDBEnvVar('DB_HOST');
    const port = getDBEnvVar('DB_PORT');
    const db = getDBEnvVar('DB_DATABASE');
    const URL = `db://${username}:${password}@${host}:${port}/${db}`;
    console.log("DB_URL", URL);
    const pool = await createPool(URL);
    app.context.db = pool;
    console.log("Connected to DB");
  } catch (e) {
    throw new Error(e);
  }
}

export default connectDB;
