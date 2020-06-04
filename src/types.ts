interface GenericObject {
    [key: string]: unknown;
}

type NotUndefined<T> = T extends undefined ? never : T;

type QueryPropertyFunction = (object: GenericObject | unknown[], string: string) => NotUndefined<unknown>;