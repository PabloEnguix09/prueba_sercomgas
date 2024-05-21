export async function listMarketers() {
    const res = await fetch("http://localhost:3000/marketers");
    const response = await res.json();
    console.log(response);
    return response.data;
}

export async function createMarketer(name: string) {
    const res = await fetch("http://localhost:3000/marketers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });
    const response = await res.json();
    return response.data;
}

export async function listOperations() {
    const res = await fetch("http://localhost:3000/operations");
    const response = await res.json();
    return response.data;
}

export async function createOperation(marketer_id: number, client_id: number, type: string, amount: number, price: number) {
    const res = await fetch("http://localhost:3000/operations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ marketer_id, client_id, type, amount, price }),
    });
    console.log(JSON.stringify({ marketer_id, client_id, type, amount, price }));
    
    const response = await res.json();
    return response.data;
}