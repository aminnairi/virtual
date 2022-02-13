import {createDispatch, createVirtualElement} from "../../sources/index.js";

const go = (route) => {
  window.history.pushState(null, null, route);
  window.dispatchEvent(new CustomEvent("route"));
};

const homePage = createVirtualElement({
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
      children: ["This is where you would write a good catch phrase."]
    })
  ]
});

const aboutPage = createVirtualElement({
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
      children: ["This is where you would tell about your company."]
    })
  ]
});

const notFoundPage = createVirtualElement({
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
      children: ["If you see this page, it means it either does not exist or has been removed."]
    })
  ]
});

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
                    onclick: () => go("/")
                  },
                  children: ["Home"]
                }),
                createVirtualElement({
                  name: "li",
                  attributes: {
                    onclick: () => go("/about")
                  },
                  children: ["About"]
                }),
                createVirtualElement({
                  name: "li",
                  attributes: {
                    onclick: () => go("/contact")
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
          children: [state.route === "/" ? homePage : state.route === "/about" ? aboutPage : notFoundPage]
        })
      ]
    });
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
