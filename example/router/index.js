import {createDispatch, createVirtualElement} from "../../sources/index.js";

const go = (route) => {
  window.history.pushState(null, null, route);
  window.dispatchEvent(new CustomEvent("route"));
};

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
    if (state.route === "/") {
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
            name: "button",
            attributes: {
              onclick: () => go("/about")
            },
            children: ["About"]
          }),
          createVirtualElement({
            name: "button",
            attributes: {
              onclick: () => go("/contact")
            },
            children: ["Contact"]
          }),
          createVirtualElement({
            name: "p",
            attributes: {},
            children: ["This is a welcome paragraph for new users."]
          })
        ]
      });
    }

    if (state.route === "/about") {
      return createVirtualElement({
        name: "div",
        attributes: {},
        children: [
          createVirtualElement({
            name: "h1",
            attributes: {},
            children: ["about"]
          }),
          createVirtualElement({
            name: "button",
            attributes: {
              onclick: () => go("/")
            },
            children: ["Home"]
          }),
          createVirtualElement({
            name: "button",
            attributes: {
              onclick: () => go("/contact")
            },
            children: ["Contact"]
          }),
          createVirtualElement({
            name: "p",
            attributes: {},
            children: ["This is a little paragraph about your website."]
          })
        ]
      });
    }

    // Use the history of your browser to go back
    return null;
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
