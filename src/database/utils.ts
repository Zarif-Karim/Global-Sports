import fs from "fs";
import { sql } from "slonik";

// path to the sql files from repository root
const baseDir = "src/database/sql";

// Environment variable names used to construct the DB connection string
type DbEnvVarName =
  | "DB_HOST"
  | "DB_PORT"
  | "DB_USER"
  | "DB_DATABASE"
  | "DB_PASSWORD";

/**
 * @description Get database specific environment variable. 
 * Throws if it doesn't exits and no defaults provided.
 * @param varName name of the evn var to get
 * @param defaultValue the value to use if env var doesn't exist
 * @returns value of the env var or the default if provided otherwise undefined
 */
export const getDBEnvVar = (
  varName: DbEnvVarName,
  defaultValue?: string
): string => {
  const varValue = process.env[varName];
  if (!varValue && !defaultValue) {
    throw new Error(`Database env var not defiled: ${varName}`);
  }
  return varValue ? varValue : defaultValue;
};

/**
 * @description Reads the file and returns a query object from it using sql.unsafe
 * @param filename name of the sql file without the trailing .sql
 * @returns query that can be passed to pool.query any anything that accepts a query object
 */
export const getQuery = (filename: string) => {
  const sqlString = fs.readFileSync(`${baseDir}/${filename}.sql`, "utf8");
  return sql.unsafe([sqlString]);
};
