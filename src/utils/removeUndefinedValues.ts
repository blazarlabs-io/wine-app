export const removeUndefinedValues = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(removeUndefinedValues);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc: any, key: any) => {
      const value = removeUndefinedValues(obj[key]);
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }
  return obj;
};
