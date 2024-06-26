export type Marketer = {
    id: number,
    name: string,
    created_at: Date,
    updated_at: Date
}

export type MarketerOption = {
    value: number,
    label: string
}

export type MarketerType = {
    name: string
} 

export type Operation = {
    id: number,
    marketer_id: number,
    client_id: number,
    type: string,
    amount: number,
    price: number,
    created_at: Date
}

export type OperationType = {
    marketer_id: number, 
    client_id: number,
    type: string,
    amount: number,
    price: number
}

export type OperationTypeOpt = {
    value: string,
    label: string
}