export const processObjectOperator = (object, string) => {
    if (!string.includes(".")) {
      return object[string];
    }
  
    const fullStringArray = string.split(".");
    const maxNumberOfIterations =
      ((fullStringArray.length + 1) / 2) * fullStringArray.length;
  
    let current = fullStringArray;
    let popped = [];
    let currentObject = { ...object };
    let isCurrentObjectDirty = false;
  
    for (let i = 0; i < maxNumberOfIterations; i++) {
      // if we have gone through all the combinations of properties
      // return the value we found
      if (current.length === 0) {
        return isCurrentObjectDirty ? currentObject : undefined;
      }
  
      const currentString = current.join(".");
      const objectProperty = currentObject[currentString];
  
      if (objectProperty === undefined) {
        isCurrentObjectDirty = false;
          // add the latest prop checked to the beginning of the array, to maintain order
        popped.unshift(current.pop());
      } else {
        currentObject = objectProperty;
        isCurrentObjectDirty = true;
        current = popped.slice();
        popped = [];
      }
    }
  
    return isCurrentObjectDirty ? currentObject : undefined;
  };