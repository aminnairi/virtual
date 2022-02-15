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

export const string = target => typeof target === "string";
export const nil = target => target === null || target === undefined;
export const element = target => target instanceof Element;
export const plainArray = target => Array.isArray(target);
export const plainObject = target => typeof target === "object" && !plainArray(target) && target !== null;
export const object = (types) => (target) => plainObject(target) && types.every(type => type(target));
export const property = (name, type) => target => plainObject(target) && type(target[name]);
export const array = (type) => target => plainArray(target) && target.every(item => type(item));
export const virtualElement = target => object([property("identifier", string), property("name", string), property("children", array), property("attributes", plainObject)]);
