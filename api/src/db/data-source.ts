import "reflect-metadata"
import { DataSource } from "typeorm"
import { Marketer } from "./entity/marketer.entity"
import { Operation } from "./entity/operation.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER ? process.env.DB_USER : "sercomgas",
    password: process.env.DB_PASS ? process.env.DB_PASS : "sercomgas",
    database: process.env.DB_NAME ? process.env.DB_NAME : "sercomgas",
    synchronize: process.env.NODE_ENV === "dev" ? true : false,
    logging: process.env.NODE_ENV === "dev" ? true : false,
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
    migrationsRun: process.env.NODE_ENV === "dev" ? false : false,
    entities: [Marketer, Operation],
  })
