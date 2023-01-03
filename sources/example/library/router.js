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
export const go = route => {
  window.history.pushState(null, null, route);
  window.dispatchEvent(new CustomEvent("popstate"));
};

export const isRoute = (route) => {
  return (path) => {
    const routeParts = route.split(/\/+/).filter(Boolean)
    const pathParts = path.split(/\/+/).filter(Boolean)

    if (routeParts.length !== pathParts.length) {
      return false
    }

    return routeParts.every((routePart, routePartIndex) => {
      if (routePart.startsWith(":")) {
        return true
      }

      return routePart === pathParts[routePartIndex]
    })
  }
}

export const parameters = (route, path) => {
  const routeParts = route.split(/\/+/).filter(Boolean)
  const pathParts = path.split(/\/+/).filter(Boolean)

  if (routeParts.length !== pathParts.length) {
    return {}
  }

  return routeParts.reduce((previousParameters, routePart, routePartIndex) => {
    if (routePart.startsWith(":")) {
      return {
        ...previousParameters,
        [routePart.slice(1)]: pathParts[routePartIndex]
      }
    }

    return previousParameters
  }, {})
}

export const onRoute = (callback) => {
  window.addEventListener("popstate", () => {
    callback(window.location.pathname)
  });
}
