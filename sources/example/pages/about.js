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
import {createVirtualElement} from "../../index.js";

export const about = (state, update) => {
  return createVirtualElement({
    key: "about",
    name: "div",
    attributes: {
      onbeforeload: () => {
        console.log("About page is about to be loaded...");
      },
      onafterload: () => {
        console.log("...about page is loaded.");
      },
      onbeforeunload: () => {
        console.log("About page is about to be unloaded...");
      },
      onafterunload: () => {
        console.log("...about page is unloaded.");
      }
    },
    children: [
      createVirtualElement({
        name: "h1",
        attributes: {},
        children: ["About"]
      }),
      createVirtualElement({
        name: "p",
        attributes: {},
        children: ["This is a little paragraph about your company."]
      })
    ]
  });
};
