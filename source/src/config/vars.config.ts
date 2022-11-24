// setup database
export const DATA_SOURCES = {
    mySqlDataSource: {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        // DB_PORT: Number(process.env.DB_PORT),
        DB_DATABASE: process.env.DB_DATABASE,
        DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT) : 4,
    }
};
