import {createVirtualElement, app} from "../sources/index.js";

const dispatch = app({
  state: {
    todo: "",
    todos: [
      "Do the laundry"
    ]
  },
  update: (state, {type, payload}) => {
    switch (type) {
      case "SET_TODO":
        return {
          ...state,
          todo: payload
        };

      case "ADD_TODO":
        return {
          ...state,
          todo: "",
          todos: [
            ...state.todos,
            state.todo
          ]
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
        name: "input",
        attributes: {
          value: state.todo,
          oninput: event => dispatch({
            type: "SET_TODO",
            payload: event.currentTarget.value
          })
        },
        children: []
      }),
      createVirtualElement({
        name: "button",
        attributes: {
          onclick: () => dispatch({
            type: "ADD_TODO",
            payload: null
          })
        },
        children: ["Add"]
      }),
      createVirtualElement({
        name: "ul",
        attributes: {},
        children: state.todos.map(todo => createVirtualElement({
          name: "li",
          attributes: {},
          children: [todo]
        }))
      })
    ]
  }),
  element: document.getElementById("element")
});
