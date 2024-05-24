import "reflect-metadata"
import * as dotenv from "dotenv";
import { buildServer } from "./server";

dotenv.config();

async function start() {
    const app = buildServer();
    app.register(require("@fastify/cors"), {
        origin: ["http://localhost:3000"],
    });

    app.listen({ port: parseInt(process.env.PORT || "8080")}, (err: Error | null, address: string) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }        

        console.log(`server listening on ${address}`);
    });
}

start();