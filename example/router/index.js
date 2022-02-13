import {createDispatch, createVirtualElement} from "../../sources/index.js";
import {match, always, equals, when} from "./utils.js";

const dispatch = createDispatch({
  element: document.getElementById("element"),
  state: {
    route: window.location.pathname
  },
  update: (state, {type, payload}) => {
    switch (type) {
      case "ROUTE_CHANGED":
        return {
          ...state,
          route: payload
        };

      default:
        return state;
    }
  },
  view: (state) => {
    return createVirtualElement({
      name: "div",
      attributes: {},
      children: [
        createVirtualElement({
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
                    onclick: () => {
                      window.history.pushState(null, "/", "/");
                      window.dispatchEvent(new CustomEvent("route"));
                    }
                  },
                  children: ["Home"]
                }),
                createVirtualElement({
                  name: "li",
                  attributes: {
                    onclick: () => {
                      window.history.pushState(null, "/about", "/about");
                      window.dispatchEvent(new CustomEvent("route"));
                    }
                  },
                  children: ["About"]
                }),
                createVirtualElement({
                  name: "li",
                  attributes: {},
                  attributes: {
                    onclick: () => {
                      window.history.pushState(null, "/contact", "/contact");
                      window.dispatchEvent(new CustomEvent("route"));
                    }
                  },
                  children: ["Contact"]
                })
              ]
            })
          ]
        }),
        createVirtualElement({
          name: "main",
          attributes: {},
          children: [
            match(state.route, [
              when(equals("/"), () => createVirtualElement({
                name: "h1",
                attributes: {},
                children: ["Home"]
              })),
              when(equals("/about"), () => createVirtualElement({
                name: "h1",
                attributes: {},
                children: ["About"]
              })),
              when(always(true), () => null)
            ])
          ]
        })
      ]
    })
  }
});

window.addEventListener("route", (event) => {
  dispatch({
    type: "ROUTE_CHANGED",
    payload: window.location.pathname
  });
});

window.addEventListener("popstate", () => {
  window.dispatchEvent(new CustomEvent("route"));
});
