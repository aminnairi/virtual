import {createVirtualElement} from "../../sources/index.js";
import {go} from "../library/router.js";

export const header = (state, update) => {
  return createVirtualElement({
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
              style: state.route === "/" ? "text-decoration: underline" : "",
              onclick: () => go("/")
            },
            children: ["Home"]
          }),
          createVirtualElement({
            name: "li",
            attributes: {
              style: state.route === "/contact" ? "text-decoration: underline" : "",
              onclick: () => go("/contact")
            },
            children: ["Contact"]
          }),
          createVirtualElement({
            name: "li",
            attributes: {
              style: state.route === "/about" ? "text-decoration: underline" : "",
              onclick: () => go("/about")
            },
            children: ["About"]
          })
        ]
      })
    ]
  });
};
