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
import {match, when, equals, always} from "../library/functional.js";
import {home} from "../pages/home.js";
import {about} from "../pages/about.js";
import {notFound} from "../pages/not-found.js";

export const main = (state, update) => {
  return createVirtualElement({
    name: "main",
    attributes: {},
    children: [
      match(state.route, [
        when(equals("/"), () => home(state, update)),
        when(equals("/about"), () => about(state, update)),
        when(always(true), () => notFound(state, update))
      ])
    ]
  })
};
