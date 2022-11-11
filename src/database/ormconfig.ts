import "dotenv/config";
import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    //schema: "growbank",
    ssl: {
        rejectUnauthorized: false,
    },
};
export default config;