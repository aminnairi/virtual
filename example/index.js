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
import {createApplication, createVirtualElement} from "../sources/index.js";

window.addEventListener("popstate", () => {
  window.dispatchEvent(new CustomEvent("route"));
});

window.addEventListener("route", () => {
  dispatch({
    type: "ROUTE_CHANGED",
    payload: window.location.pathname
  });
});

const go = route => {
  window.history.pushState(null, null, route);
  window.dispatchEvent(new CustomEvent("route"));
};

const dispatch = createApplication({
  element: document.getElementById("application"),
  state: {
    route: window.location.pathname
  },
  update: (state, {type, payload}) => {
    switch (type) {
      case "ROUTE_CHANGED":
        return {...state, route: payload};

      default:
        return state;
    }
  },
  view: (state, update) => createVirtualElement({
    name: "div",
    attributes: {},
    children: [
      createVirtualElement({
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
                  onclick: () => go("/")
                },
                children: ["Home"]
              }),
              createVirtualElement({
                name: "li",
                attributes: {
                  onclick: () => go("/contact")
                },
                children: ["Contact"]
              }),
              createVirtualElement({
                name: "li",
                attributes: {
                  onclick: () => go("/about")
                },
                children: ["About"]
              })
            ]
          })
        ]
      }),
      createVirtualElement({
        name: "main",
        attributes: {},
        children: [
          state.route === "/" ? createVirtualElement({
            name: "h1",
            key: "home",
            attributes: {
              onload: () => console.log("Home loaded"),
              onunload: () => console.log("Home unloaded")
            },
            children: [
              createVirtualElement({
                name: "span",
                attributes: {
                  onload: () => console.log("Home span loaded"),
                  onunload: () => console.log("Home span unloaded")
                },
                children: ["Home"]
              })
            ]
          }) : state.route === "/about" ? createVirtualElement({
            name: "h1",
            key: "about",
            attributes: {
              onload: () => console.log("About loaded"),
              onunload: () => console.log("About unloaded")
            },
            children: [
              createVirtualElement({
                name: "span",
                attributes: {
                  onload: () => console.log("About span loaded"),
                  onunload: () => console.log("About span unloaded")
                },
                children: ["About"]
              })
            ]
          }) : createVirtualElement({
            name: "h1",
            key: "notfound",
            attributes: {
              onload: () => console.log("Not found loaded"),
              onunload: () => console.log("Not found unloaded")
            },
            children: ["Not found"]
          })
        ]
      })
    ]
  })
});
