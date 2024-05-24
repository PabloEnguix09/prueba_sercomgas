export async function listMarketers() {
    const res = await fetch("http://localhost:8080/marketers");
    const response = await res.json();
    return response.data;
}

export async function createMarketer(name: string) {
    const res = await fetch("http://localhost:8080/marketers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });
    const response = await res.json();
    return response.data;
}

export async function listOperations(limit: number, page: number) {    
    const res = await fetch("http://localhost:8080/operations?limit=" + limit + "&page=" + page);
    const response = await res.json();
    return response.data;
}

export async function createOperation(marketer_id: number, client_id: number, type: string, amount: number, price: number) {
    const res = await fetch("http://localhost:8080/operations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ marketer_id, client_id, type, amount, price }),
    });    
    return res;
}