# virtual

Virtual DOM based JavaScript framework

## Usage

```javascript
const dispatch = app({
  state: {},
  update: (state, {type, payload}) => {
    switch (type) {
      default:
        return state;
    }
  },
  view: state => {
    return createVirtualElement({
      name: "h1",
      attributes: {},
      children: ["Hello, world!"]
    })
  },
  element: document.getElementById("element")
});
```
