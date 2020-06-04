import { processObjectOperator } from "./processObjectOperator";
const arrayRegexp = /(\[[0-9]+\])/g;

const checkObjectOperator = (string: string) => {
  const regex = new RegExp(/(\.[a-zA-Z0-9]+)/g);
  return regex.test(string)
};
const checkArrayOperator = (string: string) => {
  const regex = new RegExp(arrayRegexp);
  return regex.test(string)
};


export const queryProperty: QueryPropertyFunction = (object, string) => {
  if (!Array.isArray(object) && object[string] !== undefined) {
    return object[string];
	}
	
  let currentObject = !Array.isArray(object) ? { ...object } : [...object] as any;
  const splitArray = string.split(arrayRegexp);

  for (let i = 0; i < splitArray.length; i++) {
    const current = splitArray[i];

    // if false don't change the value
    if (!current) {
      continue;
    }

    const isObjectOperator = checkObjectOperator(current);
    const isArrayOperator = checkArrayOperator(current);
		
    // if the current part does not have an operator access the object directly
    if (!isObjectOperator && !isArrayOperator) {
      if (Array.isArray(currentObject)) {
        return null;
      }

      if (typeof currentObject === 'object') {
        if (currentObject[current] === undefined) {
          return null;
        }

        currentObject = currentObject[current];
        continue;
      }
    }

		// if the current part has one or more object operators check all possible
		// ordered combinations of the operators
    if (isObjectOperator) {
      if (typeof currentObject !== 'object') {
        return null;
      }

      const foundValue = processObjectOperator(
				currentObject,
				// if the string starts with the '.' we ignore it
				current[0] !== '.' ? current : current.slice(1)
			);

      if (foundValue !== undefined) {
        currentObject = foundValue;
			} else {
				return null;
			}
    }

		// if the current part has an array operator check if we can access the specified index
    if (isArrayOperator) {
      if (!Array.isArray(currentObject)) {
        return null;
      }

			const index = current.slice(1).slice(0, current.length - 2) as unknown as number;
			const foundValue = currentObject[index];

      if (foundValue !== undefined) {
				currentObject = foundValue as unknown;
			} else {
				return null;
			}
		}
  }

	return currentObject;
};

export default queryProperty;