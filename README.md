
### Return Type
The type of the returned value is `unknown`.
In Typescript you will need to cater for different types or you can cast the return function with `as`.

```ts
const myStringVar = queryProperty(myObject, 'prop.prop') as string;

// Typescript will not error
myStringVar.split();

const myVar = queryProperty(myObject, 'prop.prop');

// Typescript doesn't know the type
myVar.split();
```