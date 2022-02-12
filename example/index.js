import {createVirtualElement, app} from "../sources/index.js";

const dispatch = app({
  state: {
    counter: 0
  },
  update: (state, {type, payload}) => {
    switch (type) {
      case "INCREASE":
        return {
          ...state,
          counter: state.counter + 1
        };

      case "DECREASE":
        return {
          ...state,
          counter: state.counter - 1
        };

      default:
        return state;
    }
  },
  view: state => createVirtualElement({
    name: "div",
    attributes: {},
    children: [
      createVirtualElement({
        name: "button",
        attributes: {
          onclick: () => dispatch({
            type: "DECREASE",
            payload: null
          })
        },
        children: ["Decrease"]
      }),
      createVirtualElement({
        name: "span",
        attributes: {},
        children: [String(state.counter)]
      }),
      createVirtualElement({
        name: "button",
        attributes: {
          onclick: () => dispatch({
            type: "INCREASE",
            payload: null
          })
        },
        children: ["Increase"]
      })
    ]
  }),
  element: document.getElementById("element")
});
