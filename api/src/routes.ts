import { FastifyInstance } from "fastify";
import { IReply } from "./lib/interfaces";
import { Marketer } from "./db/entity/marketer.entity";
import { Operation } from "./db/entity/operation.entity";
import { MarketerType, OperationType } from "./lib/types";

export function configureRoutes(server: FastifyInstance) {

    // GET /marketers
    server.get<{ Reply: IReply<MarketerType[]> }>("/marketers", async (request, reply) => {
        const marketerRepository = server.orm["typeorm"].getRepository(Marketer);
        const marketers = await marketerRepository.find();
        reply.code(200).send({ success: true, data: marketers });
    })

    // POST /marketers
    server.post<{ Body: MarketerType; Reply: IReply<MarketerType> }>("/marketers", {
        preValidation: async (request, reply, done) => {
            const { name } = request.body;
            const marketerRepository = server.orm["typeorm"].getRepository(Marketer);
            const marketers = await marketerRepository.findOneBy({ name });
            done(
                marketers ? new Error("Marketer already exists") : undefined
            );
        }
    }, async (request, reply) => {
        const { name } = request.body;
        const marketer = new Marketer();
        marketer.name = name;
        const marketerRepository = server.orm["typeorm"].getRepository(Marketer);
        await marketerRepository.save(marketer);
        reply.code(201).send({ success: true, data: marketer });
    })

    // GET /operations
    server.get<{ Reply: IReply<OperationType[]> }>("/operations", async (request, reply) => {
        const operationRepository = server.orm["typeorm"].getRepository(Operation);
        const operations = await operationRepository.find();
        reply.code(200).send({ success: true, data: operations });
    })

    // POST /operations
    server.post<{ Body: OperationType; Reply: IReply<OperationType> }>("/operations", {
        preValidation: async (request, reply, done) => {
            const { marketer_id, client_id, type, amount, price } = request.body;
            const operationRepository = server.orm["typeorm"].getRepository(Operation);
            const operation = await operationRepository.findOneBy({ marketer_id, client_id, type, amount, price });
            done(
                operation ? new Error("Operation already exists") : undefined
            );
        }
    }, async (request, reply) => {
        const { marketer_id, client_id, type, amount, price } = request.body;
        const operation = new Operation();
        operation.marketer_id = marketer_id;
        operation.client_id = client_id;
        operation.type = type;
        operation.amount = amount;
        operation.price = price;
        const operationRepository = server.orm["typeorm"].getRepository(Operation);
        await operationRepository.save(operation);
        reply.code(201).send({ success: true, data: operation });
    })
}