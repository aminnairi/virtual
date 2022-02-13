import {createVirtualElement, createDispatch} from "../../sources/index.js";

const dispatch = createDispatch({
  state: {
    error: "",
    todo: JSON.parse(window.localStorage.getItem("todo") || '""'),
    todos: JSON.parse(window.localStorage.getItem("todos") || "[]")
  },
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
  view: state => createVirtualElement({
    name: "div",
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
          onsubmit: (event) => {
            event.preventDefault();
            dispatch({
              type: "ADD_TODO",
              payload: null
            });
          },
        },
        children: [
          createVirtualElement({
            name: "input",
            attributes: {
              required: true,
              className: "border rounded border-gray-300 px-2 py-1 mr-2 outline-none focus:border-gray-600",
              placeholder: "Ex: do the dishes",
              autofocus: true,
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
              type: "submit",
              className: "border rounded bg-blue-600 text-white px-4 py-1 hover:bg-blue-700 focus:bg-blue-800 outline-none tracking-wider transition-colors font-bold lowercase",
            },
            children: ["Add"]
          }),
        ]
      }),
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
  element: document.getElementById("element")
});
