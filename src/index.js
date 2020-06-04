import { processObjectOperator } from "./processObjectOperator";
const arrayRegexp = /(\[[0-9]+\])/g;

const checkObjectOperator = (string) => {
  const regex = new RegExp(/(\.[a-zA-Z0-9]+)/g);
  return regex.test(string)
};
const checkArrayOperator = (string) => {
  const regex = new RegExp(arrayRegexp);
  return regex.test(string)
};


export default (object, string) => {
  if (object[string] !== undefined) {
    return object[string];
	}
	
  let currentObject = !Array.isArray(object) ? { ...object } : [...object];
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
      currentObject = currentObject[current] !== undefined ? currentObject[current] : null;
      continue;
    }

		// if the current part has one or more object operators check all possible
		// ordered combinations of the operators
    if (isObjectOperator) {
      console.log(currentObject)
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

			const index = current.slice(1).slice(0, current.length - 2);
			const foundValue = currentObject[index];

      if (foundValue !== undefined) {
				currentObject = foundValue;
			} else {
				return null;
			}
		}
  }

	return currentObject;
};
