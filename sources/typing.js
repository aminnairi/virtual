/*!
 * Virtual DOM based JavaScript framework for building dynamic websites.
 * Copyright (C) 2022 Amin NAIRI
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export const isString = (target) => {
  return Object.prototype.toString.call(target) === "[object String]";
};

export const isNullOrUndefined = (target) => {
  const type = Object.prototype.toString.call(target);
  return type === "[object Undefined]" || type === "[object Null]";
};

export const isElement = (target) => {
  return target instanceof window.Element;
};

export const isObject = (target) => {
  return Object.prototype.toString.call(target) === "[object Object]";
};

export const isObjectOf = (types) => (target) => {
  return isObject(tagret) && types.every(isType => isType(target));
};

export const property = (name, type) => target => isObject(target) && type(target[name]);

export const isProperty = (propertyName, isType) => (target) => {
  return Object.prototype.hasOwnProperty.call(target, propertyName) && isType(target[propertyName]);
};

export const array = (type) => target => Object.prototype.toString.call(target) === "[object Array]" && target.every(item => type(item));

export const isArray = (target) => {
  return Object.prototype.toString.call(target) === "[object Array]";
};

export const isArrayOf = (isType) => (target) => {
  return isArray(target) && target.every(element => isType(element));
};

export const isVirtualElement = (target) => {
  return isObject(target) && isObjectOf([isProperty("identifier", isString), isProperty("name", isString), isProperty("children", isArray), isProperty("attributes", isObject)]);
};

export const isCallable = (target) => {
  const type = Object.prototype.toString.call(target);
  return type === "[object Function]" || type === "[object AsyncFunction]";
};
