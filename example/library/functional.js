/*!
 * Virtual DOM based JavaScript library for building dynamic websites.
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
export const match = (target, conditions) => {
  const foundCondition = conditions.find(([condition]) => condition(target));

  if (foundCondition) {
    return foundCondition[1](target);
  }

  return null;
};

export const when = (condition, output) => {
  return [
    condition,
    output
  ];
};

export const always = (value) => {
  return () => {
    return value;
  };
};

export const equals = (expectation) => {
  return (value) => {
    return value === expectation;
  };
};
