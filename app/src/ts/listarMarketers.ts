import { Marketer } from "../types/types";

export function listMarketersOptions(lista: Marketer[]) {
    return lista.map((marketer: Marketer) => {
        return {
            value: marketer.id,
            label: marketer.name
        }
    });
}