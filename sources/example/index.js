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
import {createApplication, createVirtualElement} from "../index.js";
import {header} from "./components/header.js";
import {main} from "./components/main.js";
import {onRoute} from "./library/router.js"
import {ACTIONS} from "./actions.js"

const dispatch = createApplication({
  element: document.getElementById("application"),
  state: {
    route: window.location.pathname,
    counter: 0
  },
  update: (state, {type, payload}) => {
    switch (type) {
      case ACTIONS.ROUTE_CHANGED:
        return {
          ...state,
          route: payload
        };

      case ACTIONS.COUNTER_INCREMENTED:
        return {
          ...state,
          counter: state.counter + 1
        };

      default:
        return state;
    }
  },
  view: (state, update) => {
    return createVirtualElement({
      name: "div",
      attributes: {},
      children: [
        header(state, update),
        main(state, update)
      ]
    })
  }
});

window.addEventListener("popstate", () => {
  window.dispatchEvent(new CustomEvent("route"));
});

onRoute(route => {
  dispatch({
    type: ACTIONS.ROUTE_CHANGED,
    payload: route
  })
})
