import {createVirtualElement} from "../../sources/index.js";
import {go} from "../library/router.js";

export const notFound = (state, update) => {
  return createVirtualElement({
    name: "div",
    attributes: {},
    children: [
      createVirtualElement({
        name: "h1",
        attributes: {},
        children: ["Not found"]
      }),
      createVirtualElement({
        name: "p",
        attributes: {},
        children: ["If you see this page, this means you tried to reach an unknown page."]
      }),
      createVirtualElement({
        name: "p",
        attributes: {},
        children: [
          createVirtualElement({
            name: "span",
            attributes: {},
            children: ["Go back to the "]
          }),
          createVirtualElement({
            name: "button",
            attributes: {
              onclick: () => go("/")
            },
            children: ["Home page"]
          })
        ]
      })
    ]
  });
};
