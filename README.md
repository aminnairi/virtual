# virtual

Virtual DOM based JavaScript framework

## Usage

```javascript
import {createVirtualElement, createDispatch} from "@aminnairi/virtual";

createDispatch({
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

## Example

See [`example`](./example).
