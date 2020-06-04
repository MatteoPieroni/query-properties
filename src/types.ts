interface GenericObject {
    [key: string]: any;
}

interface QueryProperty {
    object: GenericObject;
    string: string;
}

type QueryPropertyFunction = (args: QueryProperty) => null;
type QueryPropertyFunction = (args: QueryProperty) => string;
type QueryPropertyFunction = (args: QueryProperty) => number;
type QueryPropertyFunction = (args: QueryProperty) => GenericObject;
type QueryPropertyFunction = (args: QueryProperty) => any[];