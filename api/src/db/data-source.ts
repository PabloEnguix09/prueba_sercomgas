import "reflect-metadata"
import { DataSource } from "typeorm"
import { Marketer } from "./entity/marketer.entity"
import { Operation } from "./entity/operation.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    database: process.env.DB_DB_ || "sercomgas",
    synchronize: true,
    logging: true,
    entities: [Marketer, Operation],
    migrations: [],
    subscribers: [],
})
