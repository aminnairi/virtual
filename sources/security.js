import {isObject, isArray} from "./typing.js";

export const deepFreeze = target => {
  if (isArray(target)) {
    target.forEach(element => {
      deepFreeze(element);
    });
  } else if (isObject(target)) {
    Object.values(target).forEach(element => {
      deepFreeze(element);
    });
  }

  Object.freeze(target);
  return target;
};
