import { Static, Type } from "@sinclair/typebox";

const Marketer = Type.Object({
    id: Type.Number(),
    name: Type.String(),
    created_at: Type.Date(),
    updated_at: Type.Date(),
})

export type MarketerType = Static<typeof Marketer>;

const Operation = Type.Object({
    id: Type.Number(),
    marketer_id: Type.Number(),
    client_id: Type.Number(),
    type: Type.String(),
    amount: Type.Number(),
    price: Type.Number(),
})

export type OperationType = Static<typeof Operation>;