import {createVirtualElement} from "../../sources/index.js";
import {match, when, equals, always} from "../library/functional.js";
import {home} from "../pages/home.js";
import {about} from "../pages/about.js";
import {notFound} from "../pages/not-found.js";

export const main = (state, update) => {
  return createVirtualElement({
    name: "main",
    attributes: {},
    children: [
      match(state.route, [
        when(equals("/"), () => home(state, update)),
        when(equals("/about"), () => about(state, update)),
        when(always(true), () => notFound(state, update))
      ])
    ]
  })
};
