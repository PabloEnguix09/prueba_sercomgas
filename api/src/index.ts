import "reflect-metadata"
import * as dotenv from "dotenv";
import { buildServer } from "./server";

dotenv.config();

async function start() {
    const app = buildServer();
    /* app.register(require("@fastify/cors"), {
        origin: ["http://localhost:3000"],
    }); */
}

start();