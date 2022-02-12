# virtual

Virtual DOM based JavaScript framework

## Usage

```javascript
app({
  state: {},
  update: (state) => {
    return state;
  },
  view: () => {
    return createVirtualElement({
      name: "h1",
      attributes: {},
      children: ["Hello, world!"]
    })
  },
  element: document.getElementById("element")
});
```

## Advanced usage

```javascript
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
  view: state => {
    return createVirtualElement({
      name: "div",
      attributes: {},
      children: [
        createVirtualElement({
          name: "button",
          attributes: {
            onclick: () => {
              dispatch({
                type: "DECREASE",
                payload: null
              })
            }
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
            onclick: () => {
              dispatch({
                type: "INCREASE",
                payload: null
              })
            }
          },
          children: ["Decrease"]
        })
      ]
    })
  }
});
```
