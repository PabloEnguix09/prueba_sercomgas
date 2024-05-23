import plugin from "typeorm-fastify-plugin";
import { FastifyInstance } from "fastify";
import { Marketer } from "./entity/marketer.entity";
import { Operation } from "./entity/operation.entity";

export function configureDatabase(server: FastifyInstance) {
  
  server.register(plugin, {
    namespace: "typeorm",
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.NODE_ENV === "test" ? "testDb" : process.env.DB_NAME,
    synchronize: process.env.NODE_ENV === "dev" ? true : true,
    logging: process.env.NODE_ENV === "dev" ? true : false,
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
    migrationsRun: process.env.NODE_ENV === "dev" ? false : false,
    entities: [Marketer, Operation]
  });
}