export const createVirtualElement = (options) => {
  return {
    identifier: window.crypto.randomUUID(),
    name: options.name,
    attributes: options.attributes,
    children: options.children
  };
};

const getUpdatedAttributes = (oldAttributes, newAttributes) => {
  return Object.entries(oldAttributes).reduce((updatedAttributes, [oldAttributeName, oldAttributeValue]) => {
    if (typeof newAttributes[oldAttributeName] === "undefined" || oldAttributeValue === newAttributes[oldAttributeName]) {
      return updatedAttributes;
    }

    return {
      ...updatedAttributes,
      [oldAttributeName]: {
        oldValue: oldAttributeValue,
        newValue: newAttributes[oldAttributeName]
      }
    };
  }, {});
};

const getRemovedAttributes = (oldAttributes, newAttributes) => {
  return Object.entries(oldAttributes).reduce((removedAttributes, [oldAttributeName, oldAttributeValue]) => {
    if (typeof newAttributes[oldAttributeName] !== "undefined") {
      return removedAttributes;
    }

    return [
      ...removedAttributes,
      oldAttributeName
    ];
  }, []);
};

const getNewAttributes = (oldAttributes, newAttributes) => {
  return Object.entries(newAttributes).reduce((newAttributes, [newAttributeName, newAttributeValue]) => {
    if (typeof oldAttributes[newAttributeName] !== "undefined") {
      return newAttributes;
    }

    return {
      ...newAttributes,
      [newAttributeName]: newAttributeValue
    };
  }, {});
};

const render = virtualElement => {
  const element = document.createElement(virtualElement.name);

  Object.entries(virtualElement.attributes).forEach(([attributeName, attributeValue]) => {
    if (attributeName.startsWith("on")) {
      const eventName = attributeName.slice(2);
      element.addEventListener(eventName, attributeValue);
    } else {
      element[attributeName] = attributeValue;
    }
  });

  virtualElement.children.forEach(child => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(render(child));
    }
  });

  element.dataset.identifier = virtualElement.identifier;

  return element;
};

const getPatch = (oldVirtualElement, newVirtualElement) => {
  return element => {
    if (!oldVirtualElement) {
      const newElement = render(newVirtualElement);
      element.appendChild(newElement);
      return;
    }

    if (typeof oldVirtualElement === "string") {
      if (typeof newVirtualElement === "string") {
        if (oldVirtualElement === newVirtualElement) {
          return;
        }

        element.innerText = newVirtualElement;
        return;
      }

      element.innerText = "";
      element.appendChild(render(newVirtualElement));
      return;
    }

    const oldElement = element.querySelector(`[data-identifier="${oldVirtualElement.identifier}"]`);

    if (!oldElement) {
      return;
    }

    if (!newVirtualElement) {
      element.removeChild(oldElement);
      return;
    }

    if (typeof newVirtualElement === "string") {
      oldElement.replaceWith(document.createTextNode(newVirtualElement));
      return;
    }

    if (oldVirtualElement.name !== newVirtualElement.name) {
      const newElement = render(newVirtualElement);
      oldElement.replaceWith(newElement);
      return;
    }

    const updatedAttributes = getUpdatedAttributes(oldVirtualElement.attributes, newVirtualElement.attributes);
    const removedAttributes = getRemovedAttributes(oldVirtualElement.attributes, newVirtualElement.attributes);
    const newAttributes = getNewAttributes(oldVirtualElement.attributes, newVirtualElement.attributes);

    Object.entries(updatedAttributes).forEach(([attributeName, {oldValue, newValue}]) => {
      if (attributeName.startsWith("on")) {
        const eventName = attributeName.slice(2);
        oldElement.removeEventListener(eventName, oldValue);
        oldElement.addEventListener(eventName, newValue);
      } else {
        oldElement[attributeName] = newValue;
      }
    });

    removedAttributes.forEach(removedAttributeName => {
      oldElement.removeAttribute(removedAttributeName);
    });

    Object.entries(newAttributes).forEach(([newAttributeName, newAttributeValue]) => {
      if (newAttributeName.startsWith("on")) {
        const eventName = newAttributeName.slice(2);
        oldElement.addEventListener(eventName, newAttributeValue);
      } else {
        oldElement[newAttributeName] = newAttributeValue;
      }
    });

    oldVirtualElement.children.forEach((oldChild, oldChildIndex) => {
      const newChild = newVirtualElement.children[oldChildIndex];
      const patch = getPatch(oldChild, newChild);
      patch(oldElement);
    });

    newVirtualElement.children.forEach((newChild, newChildIndex) => {
      const oldChild = oldVirtualElement.children[newChildIndex];
      const patch = getPatch(oldChild, newChild);
      patch(oldElement);
    });

    oldElement.dataset.identifier = newVirtualElement.identifier;
  };
};

export const createDispatch = ({view, state, update, element}) => {
  let virtualElement = view(state);

  const patch = getPatch(null, virtualElement);

  patch(element);

  const dispatch = ({type, payload}) => {
    const newState = update(state, {type, payload});
    const newVirtualElement = view(newState);
    const newPatch = getPatch(virtualElement, newVirtualElement);

    newPatch(element);

    state = newState;
    virtualElement = newVirtualElement;
  };

  return dispatch;
};
