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
//@ts-check
import {isString, isElement, isVirtualElement, isNullOrUndefined, isCallable} from "./typing.js";

export const createVirtualElement = ({name, key, attributes, children}) => {
  return {
    identifier: window.crypto.randomUUID(),
    name,
    key,
    attributes,
    children
  };
};

const render = (options) => {
  if (isString(options)) {
    return document.createTextNode(options);
  }

  if (!isVirtualElement(options)) {
    return;
  }

  const {identifier, name, attributes, children} = options;

  const element = document.createElement(name);

  Object.entries(attributes).forEach(([attributeName, attributeValue]) => {
    element[attributeName] = attributeValue;
  });

  children.forEach(child => {
    element.appendChild(render(child));
  });

  element.dataset.virtual = identifier;

  return element;
};

const load = newVirtualElement => {
  if (isVirtualElement(newVirtualElement)) {
    if (isCallable(newVirtualElement.attributes.onload)) {
      newVirtualElement.attributes.onload();
    }

    newVirtualElement.children.forEach(child => {
      load(child);
    });
  }
};

const unload = (newVirtualElement) => {
  if (isVirtualElement(newVirtualElement)) {
    if (isCallable(newVirtualElement.attributes.onunload)) {
      newVirtualElement.attributes.onunload();
    }

    newVirtualElement.children.forEach(child => {
      unload(child);
    });
  }
};

const createPatch = (oldVirtualElement, newVirtualElement) => {
  return htmlElement => {
    if (isNullOrUndefined(htmlElement)) {
      return;
    }

    if (isNullOrUndefined(oldVirtualElement)) {
      if (!isNullOrUndefined(newVirtualElement)) {
        htmlElement.appendChild(render(newVirtualElement));
        load(newVirtualElement);
        return;
      }

      return;
    }

    if (isString(oldVirtualElement)) {
      if (isString(newVirtualElement)) {
        if (oldVirtualElement === newVirtualElement) {
          return;
        }

        htmlElement.innerText = newVirtualElement;
        return;
      }

      if (isNullOrUndefined(newVirtualElement)) {
        htmlElement.innerText = "";
        return;
      }

      htmlElement.innerHTML = "";
      htmlElement.appendChild(render(newVirtualElement));
      load(newVirtualElement);
      return;
    }

    if (!isVirtualElement(oldVirtualElement)) {
      return;
    }

    const oldElement = document.querySelector(`[data-virtual="${oldVirtualElement.identifier}"]`);

    if (!isElement(oldElement)) {
      return;
    }

    if (isNullOrUndefined(newVirtualElement)) {
      unload(newVirtualElement);
      htmlElement.removeChild(oldElement);
      return;
    }

    if (isString(newVirtualElement)) {
      htmlElement.innerHTML = "";
      htmlElement.innerText = newVirtualElement;
      return;
    }

    if (!isVirtualElement(newVirtualElement)) {
      return;
    }

    if (oldVirtualElement.name !== newVirtualElement.name) {
      unload(oldVirtualElement);
      htmlElement.replaceChild(render(newVirtualElement), oldElement);
      load(newVirtualElement);
      return;
    }

    if (oldVirtualElement.key !== newVirtualElement.key) {
      unload(oldVirtualElement);
      load(newVirtualElement);
    }

    Object.entries(oldVirtualElement.attributes).forEach(([oldAttributeName, oldAttributeValue]) => {
      const newAttributeValue = newVirtualElement.attributes[oldAttributeName];

      if (isNullOrUndefined(newAttributeValue)) {
        oldElement.removeAttribute(oldAttributeName);
        return;
      }

      if (oldAttributeValue !== newAttributeValue) {
        oldElement[oldAttributeName] = newAttributeValue;
      }
    });

    Object.entries(newVirtualElement.attributes).forEach(([newAttributeName, newAttributeValue]) => {
      const oldAttributeValue = oldVirtualElement.attributes[newAttributeName];

      if (isNullOrUndefined(oldAttributeValue)) {
        oldElement[newAttributeName] = newAttributeValue;
      }
    });

    newVirtualElement.children.forEach((newChild, newChildIndex) => {
      const oldChild = oldVirtualElement.children[newChildIndex];
      const patch = createPatch(oldChild, newChild);
      patch(oldElement);
    });

    oldVirtualElement.children.forEach((oldChild, oldChildIndex) => {
      const newChild = newVirtualElement.children[oldChildIndex];

      if (!newChild) {
        const patch = createPatch(oldChild, newChild);
        patch(oldElement);
      }
    });

    newVirtualElement.identifier = oldVirtualElement.identifier;
  };
};

export const createApplication = (options) => {
  let virtualElement;

  const dispatch = ({type, payload}) => {
    const newState = options.update(options.state, {type, payload});
    const newVirtualElement = options.view(newState, dispatch);
    const innerPatch = createPatch(virtualElement, newVirtualElement);
    innerPatch(options.element);
    virtualElement = newVirtualElement;
    options.state = newState;
  };

  virtualElement = options.view(options.state, dispatch);

  const patch = createPatch(null, virtualElement);
  patch(options.element);

  return dispatch;
};
