import { MarketerType, OperationType } from "../types/types";

export async function list(route: string, limit?: number, page?: number) {
    const res = await fetch("http://localhost:8080/" + route + (limit ? "?limit=" + limit + "&page=" + page : ""));
    const response = await res.json();
    return response.data;
}

export async function create(route: string, data: MarketerType | OperationType): Promise<Response> {    
    const res = await fetch("http://localhost:8080/" + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res;
}