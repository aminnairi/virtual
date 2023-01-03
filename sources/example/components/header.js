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
import {go, isRoute} from "../library/router.js";
import {style} from "../library/style.js"
import {pages} from "../pages/index.js"

export const header = (state, update) => {
  return createVirtualElement({
    name: "header",
    attributes: {},
    children: [
      createVirtualElement({
        name: "ul",
        attributes: {},
        children: [
          createVirtualElement({
            name: "li",
            attributes: {
              style: style({
                "text-decoration": isRoute(pages.home)(state.route) ? "underline" : null,
                "cursor": "pointer"
              }),
              onclick: () => go(pages.home)
            },
            children: ["Home"]
          }),
          createVirtualElement({
            name: "li",
            attributes: {
              style: style({
                "text-decoration": isRoute("/contact")(state.route) ? "underline" : null,
                "cursor": "pointer"
              }),
              onclick: () => go("/contact")
            },
            children: ["Contact"]
          }),
          createVirtualElement({
            name: "li",
            attributes: {
              style: style({
                "text-decoration": isRoute(pages.about)(state.route) ? "underline" : null,
                "cursor": "pointer"
              }),
              onclick: () => go(pages.about)
            },
            children: ["About"]
          }),
          createVirtualElement({
            name: "li",
            attributes: {
              style: style({
                "text-decoration": isRoute(pages.user.plain)(state.route) ? "underline" : null,
                "cursor": "pointer"
              }),
              onclick: () => go(pages.user.computed({user: 123}))
            },
            children: ["User#123"]
          })
        ]
      })
    ]
  });
};
