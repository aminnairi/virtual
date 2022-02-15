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
const string = target => typeof target === "string";
const nil = target => target === null || target === undefined;
const element = target => target instanceof Element;
const plainArray = target => Array.isArray(target);
const plainObject = target => typeof target === "object" && !plainArray(target) && target !== null;
const object = (types) => (target) => plainObject(target) && types.every(type => type(target));
const property = (name, type) => target => plainObject(target) && type(target[name]);
const array = (type) => target => plainArray(target) && target.every(item => type(item));
const virtualElement = target => object([property("identifier", string), property("name", string), property("children", array), property("attributes", plainObject)]);

export const createVirtualElement = ({name, attributes, children}) => {
  return {
    identifier: window.crypto.randomUUID(),
    name,
    attributes,
    children
  };
};

const render = (options) => {
  if (string(options)) {
    return document.createTextNode(options);
  }

  if (!virtualElement(options)) {
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

const createPatch = (oldVirtualElement, newVirtualElement) => {
  return htmlElement => {
    if (nil(htmlElement)) {
      return;
    }

    if (nil(oldVirtualElement)) {
      if (!nil(newVirtualElement)) {
        htmlElement.appendChild(render(newVirtualElement));
        return;
      }

      return;
    }

    if (string(oldVirtualElement)) {
      if (string(newVirtualElement)) {
        if (oldVirtualElement === newVirtualElement) {
          return;
        }

        htmlElement.innerText = newVirtualElement;
        return;
      }

      if (nil(newVirtualElement)) {
        htmlElement.innerText = "";
        return;
      }

      htmlElement.innerHTML = "";
      htmlElement.appendChild(render(newVirtualElement));
      return;
    }

    if (!virtualElement(oldVirtualElement)) {
      return;
    }

    const oldElement = document.querySelector(`[data-virtual="${oldVirtualElement.identifier}"]`);

    if (!element(oldElement)) {
      return;
    }

    if (nil(newVirtualElement)) {
      htmlElement.removeChild(oldElement);
      return;
    }

    if (string(newVirtualElement)) {
      htmlElement.innerHTML = "";
      htmlElement.innerText = newVirtualElement;
      return;
    }

    if (!virtualElement(newVirtualElement)) {
      return;
    }

    if (oldVirtualElement.name !== newVirtualElement.name) {
      htmlElement.replaceChild(render(newVirtualElement), oldElement);
      return;
    }

    Object.entries(oldVirtualElement.attributes).forEach(([oldAttributeName, oldAttributeValue]) => {
      const newAttributeValue = newVirtualElement.attributes[oldAttributeName];

      if (nil(newAttributeValue)) {
        oldElement.removeAttribute(oldAttributeName);
        return;
      }


      if (oldAttributeValue !== newAttributeValue) {
        oldElement[oldAttributeName] = newAttributeValue;
      }
    });

    Object.entries(newVirtualElement.attributes).forEach(([newAttributeName, newAttributeValue]) => {
      const oldAttributeValue = oldVirtualElement.attributes[newAttributeName];

      if (nil(oldAttributeValue)) {
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
