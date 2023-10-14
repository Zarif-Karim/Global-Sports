type DbEnvVarName = 'DB_HOST' | 'DB_PORT' | 'DB_USER' | 'DB_DATABASE' | 'DB_PASSWORD';

export const getDBEnvVar = (varName: DbEnvVarName, defaultValue?: string): string => {
    const varValue = process.env[varName];
    if(!varValue && !defaultValue) {
        throw new Error(`Database env var not defiled: ${varName}`);
    }
    return varValue ? varValue : defaultValue;
}