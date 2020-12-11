export interface Entry {
    uid? : string;
    name: string,
    quantity: number,
    type: TypeCategory,
    category: string,
    date: string
}

export enum TypeCategory {
    ingreso = "ingreso",
    egreso = "egreso"
}