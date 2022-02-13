# virtual

Virtual DOM based JavaScript framework for building dynamic websites.

## Disclaimer

:warning: This is just an exploration of mine, this wont be a big thing. Use it at your own risks. There are still a lot to improve.

## Reasons to use

- Only weights 6 Ko unminified, 2 Ko minified, and 1 Ko minified + gzipped.
- Source-code open and readable for humans.
- No JSX and thus can be used with a CDN anywhere.
- You like functional programming.
- Not that much stars of users so you can say "I was there" one day.

## Reasons not to use

- Too light and you need 85 Ko+ libraries only.
- Source-code readable , no 1-character variables so it looks like it is missing a lot of complicated things.
- No JSX and thus can be hard to maintain large websites.
- Not enough stars, because not so many users.
- Not so many users, because not so many stars.
- You don't like functional programming.

## Usage

```javascript
import {createVirtualElement, createDispatch} from "@aminnairi/virtual";

createDispatch({
  element: document.getElementById("element")
  state: {},
  update: state => state,
  view: () => createVirtualElement({
    name: "h1",
    attributes: {},
    children: ["Hello, world!"]
  }),
});
```

## Installation

### NPM

Comming soon.

### Local

#### Requirements

- Git
- Node
- NPM
- Docker (optional)
- Docker Compose (optional)

#### Clone

```bash
git clone https://github.com/aminnairi/virtual.git
cd virtual
```

#### Build

```bash
npm run build
```

or

```bash
docker-compose run --rm npm run build
```

#### Usage

```bash
cp build/index.js /path/to/your/project/virtual.js
cd /path/to/your/project
touch index.js
```

```javascript
import {createDispatch, createVirtualElement} from "./virtual.js";

createDispatch({
  element: document.getElementById("element"),
  state: {},
  update: state => state,
  view: () => createVirtualElement({
    name: "p",
    attributes: {},
    children: ["Hello, from @aminnairi/virtual!"]
  })
});
```

## Example

See [`example`](./example).

## Todo

- [X] Virtual DOM creation algorithm
- [X] DOM diffing
- [X] DOM patching
- [X] Global TEA-like state
- [ ] Keying of lists
- [ ] Explicit runtime errors
