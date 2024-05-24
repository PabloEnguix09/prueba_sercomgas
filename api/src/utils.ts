import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Marketer } from "./db/entity/marketer.entity";
import { Operation } from "./db/entity/operation.entity";
import { Repository } from "typeorm";

export async function get(server: FastifyInstance, route: string, reply: FastifyReply, options?: {take: number, skip: number}) {
    let repo : Repository<Marketer | Operation>;
    if(route.includes("marketers")) {
        repo = server.orm["typeorm"].getRepository(Marketer);
    }
    else if(route.includes("operations")) {
        repo = server.orm["typeorm"].getRepository(Operation);
    }
    else {
        reply.code(500).send({message: "An error occurred"});
        return;
    }
    const data = await repo.find(options);
    reply.code(200).send({ success: true, data: data });
}

export async function post(server: FastifyInstance, data: Marketer | Operation, reply: FastifyReply) {
    
    let searchParams = {}
    let repo : Repository<Marketer | Operation>;
    
    if(data instanceof Marketer) {
        searchParams = {name: data.name}
        repo = server.orm["typeorm"].getRepository(Marketer);
    }
    else if(data instanceof Operation) {
        searchParams = {marketer_id: data.marketer_id, client_id: data.client_id, type: data.type}
        repo = server.orm["typeorm"].getRepository(Operation);
    }
    else {
        reply.code(500).send({message: "An error occurred"});
        return;
    }
    const rowAlreadyExists = await repo.findOneBy(data);

    if(rowAlreadyExists) {
        reply.code(409).send({message: "Row already exists"});
    } else {
        await repo.save(data).then(() =>{ console.log("xd");
         reply.code(201).send({success: true, data: data})});
    }
}

export async function deleteAll(server: FastifyInstance, route: string, reply: FastifyReply) {
    let repo : Repository<Marketer | Operation>;
    if(route.includes("marketers")) {
        repo = server.orm["typeorm"].getRepository(Marketer);
    }
    else if(route.includes("operations")) {
        repo = server.orm["typeorm"].getRepository(Operation);
    }
    else {
        reply.code(500).send({message: "An error occurred"});
        return;
    }
    await repo.clear();
    reply.code(204).send({ success: true, message: "All data deleted from table" });
}