import Koa from "koa";
import { DatabasePool, createPool } from "slonik";
import { getDBEnvVar, getQuery } from "./utils";

/**
 *  @description The connection mode used to connect DB
 *  @var CONTAINER Connect to the general container
 *  @var DATABASE Connect to the Database (env var DB_DATABASE) schema in the container
 */
enum DbConnMode {
  CONTAINER, // 0
  DATABASE, // 1
}

async function connectDB(app: Koa, mode: DbConnMode = DbConnMode.CONTAINER) {
  const modeC = mode === DbConnMode.CONTAINER;
  try {
    const username = getDBEnvVar("DB_USER");
    const password = getDBEnvVar("DB_PASSWORD");
    const host = getDBEnvVar("DB_HOST");
    const port = getDBEnvVar("DB_PORT");
    const db = getDBEnvVar("DB_DATABASE");
    console.log("Establishing connection to DB", modeC ? "Container" : "");

    let URL = `db://${username}:${password}@${host}:${port}`;
    if (!modeC) URL = URL.concat(`/${db}`);

    const pool = await createPool(URL);
    app.context.db = pool;
    console.log("Connected to DB", modeC ? "Container" : "");

    if (modeC) await createDbIfNotExist(app);
  } catch (e) {
    console.log("Failed Connecting to db", e);
    throw new Error("Failed Connecting to db".concat(e));
  }
}

const createDbIfNotExist = async (app: Koa) => {
  const pool: DatabasePool = app.context.db;
  try {
    const { rowCount } = await pool.query(getQuery("db-exists-check"));
    if (rowCount === 0) {
      console.log("Database doesnot exits. Creating Database...");
      await pool.query(getQuery("create-db"));
      console.log("Database created!");
    }
    await connectDB(app, DbConnMode.DATABASE);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
