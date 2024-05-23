import { FastifyInstance } from "fastify";
import { IReply } from "./lib/interfaces";
import { Marketer } from "./db/entity/marketer.entity";
import { Operation } from "./db/entity/operation.entity";
import { MarketerType, OperationType } from "./lib/types";

export function configureRoutes(server: FastifyInstance) {

    console.log("Configuring routes...");
    
    // GET /
    server.get("/", async (request, reply) => {
        reply.code(200).send({ success: true, message: "Hello World" });
    })

    // GET /marketers
    server.get<{ Reply: IReply<MarketerType[]> }>("/marketers", async (request, reply) => {
        const marketerRepository = server.orm["typeorm"].getRepository(Marketer);
        const marketers = await marketerRepository.find();
        reply.code(200).send({ success: true, data: marketers });
    })

    // POST /marketers
    server.post<{ Body: MarketerType; Reply: IReply<MarketerType> }>("/marketers", async (request, reply) => {
        const { name } = request.body;
        const marketer = new Marketer();
        marketer.name = name;
        const marketerRepository = server.orm["typeorm"].getRepository(Marketer);
        const marketerAlreadyExists = await marketerRepository.findOneBy({ name });
        if(marketerAlreadyExists) {
            reply.code(409).send({ message: "Marketer already exists" });
        }
        else if(marketerAlreadyExists == null) {
            await marketerRepository.save(marketer);
            reply.code(201).send({ success: true, data: marketer });
        }
        else {
            reply.code(500).send({ message: "An error occurred" });
        }
    })

    // DELETE /marketers
    server.delete<{ Querystring: { name: string } }>("/marketers", async (request, reply) => {
        const marketerRepository = server.orm["typeorm"].getRepository(Marketer);
        await marketerRepository.clear();
        reply.code(204).send({ success: true, message: "Marketers deleted" });
    })

    // GET /operations
    server.get<{ Reply: IReply<OperationType[]>; Querystring: { limit: string; page: string } }>("/operations", async (request, reply) => {
        const { limit, page} = request.query;
        const limitDefault = 2;
        const pageDefault = 1;
        const limitV = limit ? parseInt(limit) : limitDefault;
        const pageV = page ? parseInt(page) : pageDefault;
        const skip = (limitV * pageV) - limitV;

        const operationRepository = server.orm["typeorm"].getRepository(Operation);
        const operations = await operationRepository.find({
            take: limitV,
            skip: skip
        });
        reply.code(200).send({ success: true, data: operations });
    })

    // POST /operations
    server.post<{ Body: OperationType; Reply: IReply<OperationType> }>("/operations", async (request, reply) => {
        const { marketer_id, client_id, type, amount, price } = request.body;
        const operation = new Operation();
        operation.marketer_id = marketer_id;
        operation.client_id = client_id;
        operation.type = type;
        operation.amount = amount;
        operation.price = price;
        const operationRepository = server.orm["typeorm"].getRepository(Operation);
        const operationAlreadyExists = await operationRepository.findOneBy({ marketer_id, client_id, type, amount, price });
        if(operationAlreadyExists) {
            reply.code(412).send({ message: "Operation already exists" });
        }
        else if(operationAlreadyExists == null) {
            await operationRepository.save(operation);
            reply.code(201).send({ success: true, data: operation });
        }
        else {
            reply.code(500).send({ message: "Internal server error" });
        }
    })

    // DELETE /operations
    server.delete<{ Querystring: { name: string } }>("/operations", async (request, reply) => {
        const operationRepository = server.orm["typeorm"].getRepository(Operation);
        await operationRepository.clear();
        reply.code(204).send({ success: true, message: "Operations deleted" });
    })
}