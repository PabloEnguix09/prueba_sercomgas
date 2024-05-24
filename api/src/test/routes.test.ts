import { describe, expect, it, beforeAll, beforeEach, afterAll }  from "@jest/globals";
import Fastify from "fastify";
import { configureRoutes } from "../routes";
import * as dotenv from "dotenv";
import { configureDatabase } from "../db/db.config";
import { buildServer } from "../server";
dotenv.config();

//const server = Fastify({ logger: false });
const server = buildServer();
describe("TESTS ", () => {

    beforeEach(async () => {
      await server.ready();
    });

    afterAll(async () => {
        await server.close();
    });

    describe("Health check", () => {
        it("GET/ should return 200", async() => {
            
            const response = await server.inject({
                method: "GET",
                url: "/",
              });
          
              expect(response.statusCode).toBe(200);
        });
    });

    describe("/marketers", () => {
        it("GET /marketers should return 404", async () => {
            const response = await server.inject({
              method: "GET",
              url: "/a",
            });
    
            expect(response.statusCode).toBe(404);
        });
    
        it("GET /marketers should return 200 empty", async () => {
            const response = await server.inject({
              method: "GET",
              url: "/marketers",
            });
    
            expect(response.statusCode).toBe(200);
            expect(response.json().data).toEqual([]);
        });

        it("POST /marketers should return 201", async () => {
            const response = await server.inject({
              method: "POST",
              url: "/marketers",
              payload: {
                name: "test"
              }
            });
    
            expect(response.statusCode).toBe(201);
            expect(response.json().data.name).toEqual("test");
        });

        it("POST /marketers should return 409", async () => {
            const response = await server.inject({
              method: "POST",
              url: "/marketers",
              payload: {
                name: "test"
              }
            });
    
            expect(response.statusCode).toBe(409);
        });

        it("GET /marketers should return 200", async () => {
            const response = await server.inject({
              method: "GET",
              url: "/marketers",
            });
    
            expect(response.statusCode).toBe(200);
            expect(response.json().data[0].name).toEqual("test");
        });

        it("should return 204", async () => {
            const response = await server.inject({
              method: "DELETE",
              url: "/marketers",
            });
    
            expect(response.statusCode).toBe(204);
        });
    });

    describe("/operations", () => {

        beforeAll(async () => {
            await server.inject({
              method: "POST",
              url: "/marketers",
              payload: {
                name: "test"
              }
            });

            await server.inject({
              method: "POST",
              url: "/operations",
              payload: {
                name: "other"
              }
            });
        });

        afterAll(async () => {
            await server.inject({
              method: "DELETE",
              url: "/marketers",
            });
        });

        it("GET /operations should return 404", async () => {
            const response = await server.inject({
              method: "GET",
              url: "/a",
            });
    
            expect(response.statusCode).toBe(404);
        });

        it("GET /operations should return 200 empty", async () => {
            const response = await server.inject({
              method: "GET",
              url: "/operations",
            });
    
            expect(response.statusCode).toBe(200);
    
            expect(response.json().data).toEqual([]);
        });

        it("POST /operations should return 200", async () => {
            const payload = {
              marketer_id: 1,
              client_id: 2,
              type: "Compra",
              amount: 1,
              price: 1
            };
            const response = await server.inject({
              method: "POST",
              url: "/operations",
              payload: payload
            });
    
            expect(response.statusCode).toBe(201);
            
            expect(response.json().data.marketer_id).toEqual(1);
            expect(response.json().data.client_id).toEqual(2);
            expect(response.json().data.type).toEqual("Compra");
            expect(response.json().data.amount).toEqual(1);
            expect(response.json().data.price).toEqual(1);
        });

        it("GET /operations should return 200", async () => {
            const response = await server.inject({
              method: "GET",
              url: "/operations",
            });
    
            expect(response.statusCode).toBe(200);

            expect(response.json().data[0].marketer_id).toEqual(1);
            expect(response.json().data[0].client_id).toEqual(2);
            expect(response.json().data[0].type).toEqual("Compra");
            expect(response.json().data[0].amount).toEqual(1);
            expect(response.json().data[0].price).toEqual(1);
        });

        it("DELETE /operations should return 204", async () => {
            const response = await server.inject({
              method: "DELETE",
              url: "/operations",
            });
    
            expect(response.statusCode).toBe(204);
        });
    });
  });