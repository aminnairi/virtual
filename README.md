# virtual

Virtual DOM based JavaScript framework

## Disclaimer

:warning: This is just an exploration of mine, this wont be a big thing. Use it at your own risks. There are still a lot to improve.

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
