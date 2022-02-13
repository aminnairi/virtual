import {createVirtualElement, createDispatch} from "../../sources/index.js";

// This is basically a todo list app
// But using a more functional take compared to other libraries and frameworks
const dispatch = createDispatch({
  // This is the state of our app
  state: {
    error: "",
    todo: JSON.parse(window.localStorage.getItem("todo") || '""'),
    todos: JSON.parse(window.localStorage.getItem("todos") || "[]")
  },
  // This is where we can update our state
  // This is triggered when calling the dispatch function
  update: (state, {type, payload}) => {
    switch (type) {
      case "SET_TODO":
        window.localStorage.setItem("todo", JSON.stringify(String(payload).trim()));
        return {
          ...state,
          error: "",
          todo: String(payload).trim()
        };

      case "ADD_TODO": {
        const newTodos = [...state.todos, state.todo];
        window.localStorage.setItem("todos", JSON.stringify(newTodos));
        window.localStorage.setItem("todo", "");
        return state.todo.length === 0 ? ({
          ...state,
          error: "Description is too short"
        }) : ({
          ...state,
          error: "",
          todo: "",
          todos: newTodos
        });
      }

      case "REMOVE_TODO": {
        const newTodos = state.todos.filter((todo, todoIndex) => todoIndex !== payload);
        window.localStorage.setItem("todos", JSON.stringify(newTodos));
        return {
          ...state,
          error: "",
          todos: newTodos
        };
      }

      default:
        return state;
    }
  },
  // This is where we can handled the rendering of our app
  view: state => createVirtualElement({
    // The name is the tag name of the wanted element
    name: "div",
    // Attributes are just a record of the HTML attributes you want
    attributes: {
      className: "p-4",
    },
    children: [
      createVirtualElement({
        name: "small",
        attributes: {
          className: "block text-red-500 mb-2"
        },
        children: [state.error]
      }),
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
              className: "border rounded border-gray-300 px-2 py-1 mr-2 outline-none focus:border-gray-600",
              placeholder: "Ex: do the dishes",
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
              type: "submit",
              className: "border rounded bg-blue-600 text-white px-4 py-1 hover:bg-blue-700 focus:bg-blue-800 outline-none tracking-wider transition-colors font-bold lowercase",
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
        children: [
          createVirtualElement({
            name: "div",
            attributes: {
              className: "text-gray-400 mt-2",
            },
            children: ["No todos to display"]
          })
        ]
      }) : createVirtualElement({
        name: "ul",
        attributes: {
          className: "mt-2 pl-2",
        },
        // Rendering dynamic child is just a matter of calling the map method on an array
        // As long as you return an array of virtual element
        children: state.todos.map((todo, todoIndex) => createVirtualElement({
          name: "li",
          attributes: {
            className: "mb-2",
          },
          children: [
            createVirtualElement({
              name: "span",
              attributes: {
                className: "text-gray-700",
              },
              children: [todo]
            }),
            // Yes this is a real todo app
            createVirtualElement({
              name: "button",
              attributes: {
                className: "tracking-wider ml-2 px-3 py-1 bg-red-50 border rounded border-red-300 text-red-400 focus:bg-red-800 focus:border-red-800 focus:text-red-50 hover:bg-red-700 hover:text-red-100 hover:border-red-700 transition-colors font-bold lowercase",
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
