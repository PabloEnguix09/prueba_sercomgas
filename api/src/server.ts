import Fastify, { FastifyInstance } from "fastify";
import { configureDatabase } from "./db/db.config";
import { configureRoutes } from "./routes";

export function buildServer(logger:boolean = false): FastifyInstance {
    const server = Fastify({ logger: logger });
    configureDatabase(server);
    configureRoutes(server);

    server.register(require("@fastify/cors"), {
        origin: ["http://localhost:3000"],
    });

    server.listen({ port: parseInt(process.env.PORT || "8080")}, (err: Error | null, address: string) => {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }        

        console.log(`server listening on http://localhost:${process.env.PORT || 8080}`);
    });
    
    return server;
}