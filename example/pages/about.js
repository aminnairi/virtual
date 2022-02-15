import {createVirtualElement} from "../../sources/index.js";

export const about = (state, update) => {
  return createVirtualElement({
    name: "div",
    attributes: {},
    children: [
      createVirtualElement({
        name: "h1",
        attributes: {},
        children: ["About"]
      }),
      createVirtualElement({
        name: "p",
        attributes: {},
        children: ["This is a little paragraph about your company."]
      })
    ]
  });
};
