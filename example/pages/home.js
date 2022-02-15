import {createVirtualElement} from "../../sources/index.js";

export const home = (state, update) => {
  return createVirtualElement({
    name: "div",
    attributes: {},
    children: [
      createVirtualElement({
        name: "h1",
        attributes: {},
        children: ["Home"]
      }),
      createVirtualElement({
        name: "p",
        attributes: {},
        children: ["This is a little paragraph about why users should choose your services."]
      })
    ]
  });
};
