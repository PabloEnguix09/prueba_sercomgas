import { FastifyInstance } from "fastify";
import { Operation } from "../db/entity/operation.entity";
import { IReply } from "../lib/interfaces";
import { OperationType } from "../lib/types";
import { deleteAll, get, post } from "../utils";

export function operationRoutes(server: FastifyInstance) {
    // GET /operations
    server.get<{ Reply: IReply<OperationType[]>; Querystring: { limit: string; page: string } }>("/operations", async (request, reply) => {
        const { limit, page } = request.query;
        const limitDefault = 5;
        const pageDefault = 1;
        const limitV = limit ? parseInt(limit) : limitDefault;
        const pageV = page ? parseInt(page) : pageDefault;
        const skip = (limitV * pageV) - limitV;

        await get(server, "/operations", reply, {take: limitV, skip: skip});
    });

    // POST /operations
    server.post<{ Body: OperationType; Reply: IReply<OperationType> }>("/operations", async (request, reply) => {
        
        const { marketer_id, client_id, type, amount, price } = request.body;
        const operation = new Operation();
        operation.marketer_id = marketer_id;
        operation.client_id = client_id;
        operation.type = type;
        operation.amount = amount;
        operation.price = price;
        
        await post(server, operation, reply);
    });

    // DELETE /operations
    server.delete<{ Querystring: { name: string } }>("/operations", async (request, reply) => {
        await deleteAll(server, "/operations", reply);
    });
}