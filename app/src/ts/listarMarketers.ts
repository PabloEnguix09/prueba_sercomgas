import { Marketer, MarketerOption } from "../types/types";

export function listMarketersOptions(lista: Marketer[]): MarketerOption[] {
    return lista.map((marketer: Marketer) => {
        return {
            value: marketer.id,
            label: marketer.name
        }
    });
}