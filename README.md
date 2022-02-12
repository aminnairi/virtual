# virtual

Virtual DOM based JavaScript framework

## Usage

```javascript
import {createVirtualElement, app} from "@aminnairi/virtual";

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

## Example

See [`example`](./example).
