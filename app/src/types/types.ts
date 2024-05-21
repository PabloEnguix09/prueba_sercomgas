export type Marketer = {
    id: number,
    name: string,
    created_at: Date,
    updated_at: Date
}

export type Operation = {
    id: number,
    marketer_id: number,
    client_id: number,
    type: string,
    amount: number,
    price: number
}