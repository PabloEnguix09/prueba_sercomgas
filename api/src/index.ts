import "reflect-metadata"
import * as dotenv from "dotenv";
import Fastify, { FastifyBaseLogger, FastifyInstance, FastifyTypeProviderDefault, RawServerDefault } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { configureRoutes } from "./routes";
import { configureDatabase } from "./db/db.config";
import { IncomingMessage, ServerResponse } from "node:http";
import { buildServer } from "./server";

dotenv.config();

async function start() {
    const app = buildServer();
    app.register(require("@fastify/cors"), {
        origin: ["http://localhost:3001"],
    })

    app.listen({ port: parseInt(process.env.PORT || "3000")}, (err: Error | null, address: string) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }        

        console.log(`server listening on ${address}`);
    });
}

start();