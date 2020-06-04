export interface GenericObject {
    [key: string]: unknown;
}

export type NotUndefined<T> = T extends undefined ? never : T;

export type QueryPropertyFunction = (object: GenericObject | unknown[], string: string) => NotUndefined<unknown>;
export type ProcessObjectOperator = (object: GenericObject, string: string) => unknown;