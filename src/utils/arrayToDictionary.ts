import { deepMerge } from "./deepMerge";

export const arrayToDictionary = (objVal) => {
  return {
    ...objVal.reduce((acc, color) => {
      return deepMerge(acc, color);
    }, {}),
  };
};
