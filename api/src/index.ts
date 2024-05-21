import * as dotenv from "dotenv";
import Fastify, { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { configureRoutes } from "./routes";
import { configureDatabase } from "./db.config";

dotenv.config();

async function start() {
    const app: FastifyInstance = Fastify({}).withTypeProvider<TypeBoxTypeProvider>();

    configureDatabase(app);
    configureRoutes(app);
    app.register(require("@fastify/cors"), {
        origin: ["http://localhost:3001"],
    })

    await app.listen({ port: parseInt(process.env.PORT || "3000")});
}

start()
    .then(() => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
    .catch(error => {
        console.log("An error occurred: ", error)
        process.exit(1)
    });