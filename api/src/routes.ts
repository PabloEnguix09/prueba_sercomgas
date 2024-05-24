import { FastifyInstance } from "fastify";
import { marketerRoutes } from "./routes/marketer";
import { operationRoutes } from "./routes/operation";

export function configureRoutes(server: FastifyInstance) {

    // GET /
    server.get("/", async (request, reply) => {
        reply.code(200).send({ success: true, message: "Hello World" });
    });

    marketerRoutes(server);
    operationRoutes(server);
}