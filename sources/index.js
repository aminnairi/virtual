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
//@ts-check
import {isString, isElement, isVirtualElement, isNullOrUndefined, isCallable} from "./typing.js";
import {deepFreeze} from "./security.js";
import {camelToKebab} from "./casing.js";

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

  const element = options.attributes.xmlns ? document.createElementNS(options.attributes.xmlns, options.name) : document.createElement(name);

  Object.entries(attributes).forEach(([attributeName, attributeValue]) => {
    if (attributeName === "xmlns") {
      return;
    }

    if (options.attributes.xmlns) {
      element.setAttribute(camelToKebab(attributeName), attributeValue);
      return;
    }

    element[attributeName] = attributeValue;
  });

  children.forEach(child => {
    element.appendChild(render(child));
  });

  element.dataset.virtual = identifier;

  return element;
};

const onbeforeload = newVirtualElement => {
  if (isVirtualElement(newVirtualElement)) {
    if (isCallable(newVirtualElement.attributes.onbeforeload)) {
      newVirtualElement.attributes.onbeforeload();
    }

    newVirtualElement.children.forEach(child => {
      onbeforeload(child);
    });
  }
};

const onafterload = newVirtualElement => {
  if (isVirtualElement(newVirtualElement)) {
    if (isCallable(newVirtualElement.attributes.onafterload)) {
      newVirtualElement.attributes.onafterload();
    }

    newVirtualElement.children.forEach(child => {
      onafterload(child);
    });
  }
};

const onbeforeunload = (newVirtualElement) => {
  if (isVirtualElement(newVirtualElement)) {
    if (isCallable(newVirtualElement.attributes.onbeforeunload)) {
      newVirtualElement.attributes.onbeforeunload();
    }

    newVirtualElement.children.forEach(child => {
      onbeforeunload(child);
    });
  }
};

const onafterunload = (newVirtualElement) => {
  if (isVirtualElement(newVirtualElement)) {
    if (isCallable(newVirtualElement.attributes.onafterunload)) {
      newVirtualElement.attributes.onafterunload();
    }

    newVirtualElement.children.forEach(child => {
      onafterunload(child);
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
        onbeforeload(newVirtualElement);
        htmlElement.appendChild(render(newVirtualElement));
        onafterload(newVirtualElement);
        return;
      }

      return;
    }

    if (isString(oldVirtualElement)) {
      if (isString(newVirtualElement)) {
        if (oldVirtualElement === newVirtualElement) {
          return;
        }

        htmlElement.textContent = newVirtualElement;
        return;
      }

      if (isNullOrUndefined(newVirtualElement)) {
        htmlElement.textContent = "";
        return;
      }

      htmlElement.innerHTML = "";
      onbeforeload(newVirtualElement);
      htmlElement.appendChild(render(newVirtualElement));
      onafterload(newVirtualElement);
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
      onbeforeunload(newVirtualElement);
      htmlElement.removeChild(oldElement);
      onafterunload(newVirtualElement);
      return;
    }

    if (isString(newVirtualElement)) {
      htmlElement.innerHTML = "";
      htmlElement.textContent = newVirtualElement;
      return;
    }

    if (!isVirtualElement(newVirtualElement)) {
      return;
    }

    if (oldVirtualElement.name !== newVirtualElement.name || oldVirtualElement.key !== newVirtualElement.key) {
      onbeforeunload(oldVirtualElement);
      onbeforeload(newVirtualElement);
      htmlElement.replaceChild(render(newVirtualElement), oldElement);
      onafterunload(oldVirtualElement);
      onafterload(newVirtualElement);
      return;
    }

    Object.entries(oldVirtualElement.attributes).forEach(([oldAttributeName, oldAttributeValue]) => {
      const newAttributeValue = newVirtualElement.attributes[oldAttributeName];

      if (isNullOrUndefined(newAttributeValue)) {
        oldElement.removeAttribute(oldAttributeName);
        return;
      }

      if (oldAttributeValue !== newAttributeValue) {
        if (newVirtualElement.attributes.xmlns) {
          oldElement.setAttribute(camelToKebab(oldAttributeName), newAttributeValue);
        } else {
          oldElement[oldAttributeName] = newAttributeValue;
        }
      }
    });

    Object.entries(newVirtualElement.attributes).forEach(([newAttributeName, newAttributeValue]) => {
      const oldAttributeValue = oldVirtualElement.attributes[newAttributeName];

      if (isNullOrUndefined(oldAttributeValue)) {
        if (newVirtualElement.attributes.xmlns) {
          oldElement.setAttribute(camelToKebab(newAttributeName), newAttributeValue);
        } else {
          oldElement[newAttributeName] = newAttributeValue;
        }
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
    const newVirtualElement = options.view(deepFreeze(newState), deepFreeze(dispatch));
    const innerPatch = createPatch(virtualElement, newVirtualElement);
    innerPatch(options.element);
    virtualElement = newVirtualElement;
    options.state = newState;
  };

  virtualElement = options.view(deepFreeze(options.state), deepFreeze(dispatch));

  const patch = createPatch(null, virtualElement);
  patch(options.element);

  return dispatch;
};
