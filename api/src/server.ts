import Fastify, { FastifyInstance } from "fastify";
import { configureDatabase } from "./db/db.config";
import { configureRoutes } from "./routes";

export function buildServer(): FastifyInstance {
    const server = Fastify({ logger: true });
    configureDatabase(server);
    configureRoutes(server);
    
    return server;
}