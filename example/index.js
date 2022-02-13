import {createVirtualElement, createDispatch} from "../sources/index.js";

// This is basically a todo list app
// But using a more functional take compared to other libraries and frameworks
const dispatch = createDispatch({
  // This is the state of our app
  state: {
    todo: "",
    todos: []
  },
  // This is where we can update our state
  // This is triggered when calling the dispatch function
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

      case "REMOVE_TODO":
        return {
          ...state,
          todos: state.todos.filter((todo, todoIndex) => todoIndex !== payload)
        };

      default:
        return state;
    }
  },
  // This is where we can handled the rendering of our app
  view: state => createVirtualElement({
    // The name is the tag name of the wanted element
    name: "div",
    // Attributes are just a record of the HTML attributes you want
    attributes: {},
    children: [
      createVirtualElement({
        name: "form",
        attributes: {
          // Dispatching means calling the update function with the wanted type and payload
          onsubmit: (event) => {
            event.preventDefault();
            dispatch({
              type: "ADD_TODO",
              payload: null
            });
          },
        },
        children: [
          // A virtual element is just an object representing an HTMLElement
          createVirtualElement({
            name: "input",
            attributes: {
              value: state.todo,
              // You can have events too in attributes
              // They take the exact same name as in JavaScript
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
              type: "submit"
            },
            // Children can be either a text or another virtual element
            children: ["Add"]
          }),
        ]
      }),
      // You can have conditional rendering too using a ternary operator
      state.todos.length === 0 ? createVirtualElement({
        name: "p",
        attributes: {},
        children: ["No todos to display"]
      }) : createVirtualElement({
        name: "ul",
        attributes: {},
        // Rendering dynamic child is just a matter of calling the map method on an array
        // As long as you return an array of virtual element
        children: state.todos.map((todo, todoIndex) => createVirtualElement({
          name: "li",
          attributes: {},
          children: [
            createVirtualElement({
              name: "span",
              attributes: {},
              children: [todo]
            }),
            // Yes this is a real todo app
            createVirtualElement({
              name: "button",
              attributes: {
                onclick: () => dispatch({
                  type: "REMOVE_TODO",
                  payload: todoIndex
                })
              },
              children: ["Remove"]
            })
          ]
        }))
      })
    ]
  }),
  // This is the element that will be used to mount the app
  element: document.getElementById("element")
});
