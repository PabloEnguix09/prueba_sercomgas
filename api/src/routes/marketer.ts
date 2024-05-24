import { FastifyInstance } from "fastify";
import { MarketerType } from "../lib/types";
import { Marketer } from "../db/entity/marketer.entity";
import { IReply } from "../lib/interfaces";
import { deleteAll, get, post } from "../utils";

export function marketerRoutes(server: FastifyInstance) {
    // GET /marketers
    server.get<{ Reply: IReply<MarketerType[]> }>("/marketers", async (request, reply) => {
        await get(server, "/marketers", reply);
    });

    // POST /marketers
    server.post<{ Body: MarketerType; Reply: IReply<MarketerType> }>("/marketers", async (request, reply) => {

        const { name } = request.body;
        const marketer = new Marketer();
        marketer.name = name;
        await post(server, marketer, reply);
    });

    // DELETE /marketers
    server.delete<{ Querystring: { name: string } }>("/marketers", async (request, reply) => {
        await deleteAll(server, "/marketers", reply);
    });
}