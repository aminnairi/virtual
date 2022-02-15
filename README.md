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
import {createVirtualElement, createApplication} from "@aminnairi/virtual";

createApplication({
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

## API

### createVirtualElement

#### Create an element with a text node

```javascript
createVirtualElement({
  name: "h1",
  attributes: {},
  children: ["Hello, world!"]
});
```

Equivalent to

```html
<h1>Hello, world!</h1>
```

### Create an element with an event

```javascript
// <button onclick="() => console.log('Hello');">Click</button>
createVirtualElement({
  name: "button",
  attributes: {
    onclick: () => {
      console.log("Hello");
    }
  },
  children: ["Click"]
});
```

Equivalent to

```html
<button onclick="() => console.log('Hello');">Click</button>
```

## Create an element with multiple children

```javascript
createVirtualElement({
  name: "ul",
  attributes: {},
  children: [
    createVirtualElement({
      name: "li",
      attributes: {},
      children: ["HTML"]
    }),
    createVirtualElement({
      name: "li",
      attributes: {},
      children: ["CSS"]
    }),
    createVirtualElement({
      name: "li",
      attributes: {},
      children: ["JavaScript"]
    })
  ]
});
```

Equivalent to

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

#### Create an element with a CSS class

```javascript
createVirtualElement({
  name: "p",
  attributes: {
    className: "text-center text-red"
  },
  children: ["Hello, world!"]
});
```

Equivalent to

```html
<p class="text-center text-red">Hello, world!</p>
```

#### Create an input with a label

```javascript
createVirtualElement({
  name: "div",
  attributes: {},
  children: [
    createVirtualElement({
      name: "label",
      attributes: {
        htmlFor: "email"
      },
      children: ["Email"]
    }),
    createVirtualElement({
      name: "input",
      attributes: {
        id: "email",
        placeholder: "Ex: john@doe.com"
      },
      children: []
    })
  ]
})
```

Equivalent to

```html
<div>
  <label for="email">Email</label>
  <input id="email" placeholder="Ex: john@doe.com">
</div>
```

### createApplication

#### Simple application

```javascript
createApplication({
  element: document.getElementById("application"),
  state: {},
  update: state => state,
  view: () => createVirtualElement({
    name: "h1",
    attributes: {},
    children: ["Hello, world!"]
  })
});
```

#### State

```javascript
createApplication({
  element: document.getElementById("application"),
  state: {
    title: "Hello, world!",
    dayOfWeek: 3
  },
  update: state => state,
  view: (state) => createVirtualElement({
    name: "div",
    attributes: {},
    children: [
      createVirtualElement({
        name: "h1",
        attributes: {},
        children: [state.title]
      }),
      createVirtualElement({
        name: "p",
        attributes: {},
        children: [String(state.dayOfWeek)]
      })
    ]
  })
});
```

#### Update

```javascript
createApplication({
  element: document.getElementById("application"),
  state: {
    counter: 0
  },
  update: (state, {type, payload}) => {
    switch (type) {
      case "INCREASE":
        return {...state, counter: state.counter + 1};

      default:
        return state;
    }
  },
  view: (state, update) => createVirtualElement({
    name: "div",
    attributes: {},
    children: [
      createVirtualElement({
        name: "button",
        attributes: {
          onclick: () => update({type: "INCREASE", payload: null})
        },
        children: ["Increase"]
      }),
      createVirtualElement({
        name: "p",
        attributes: {},
        children: [`Counter is ${state.counter}`]
      })
    ]
  })
});
```

#### Side effects

```javascript
const go = route => {
  window.history.pushState(null, null, route);
  window.dispatchEvent(new CustomEvent("route"));
};

const dispatch = createApplication({
  element: document.getElementById("application"),
  state: {
    route: window.location.pathname
  },
  update: (state, {type, payload}) => {
    switch (type) {
      case "ROUTE_CHANGED":
        return {...state, route: payload};

      default:
        return state;
    }
  },
  view: (state, update) => createVirtualElement({
    name: "div",
    attributes: {},
    children: [
      createVirtualElement({
        name: "header",
        attributes: {},
        children: [
          createVirtualElement({
            name: "ul",
            attributes: {},
            children: [
              createVirtualElement({
                name: "li",
                attributes: {
                  onclick: () => go("/")
                },
                children: ["Home"]
              }),
              createVirtualElement({
                name: "li",
                attributes: {
                  onclick: () => go("/contact")
                },
                children: ["Contact"]
              }),
              createVirtualElement({
                name: "li",
                attributes: {
                  onclick: () => go("/about")
                },
                children: ["About"]
              })
            ]
          })
        ]
      }),
      createVirtualElement({
        name: "main",
        attributes: {},
        children: [
          state.route === "/" ? createVirtualElement({
            name: "h1",
            attributes: {},
            children: ["Home"]
          }) : state.route === "/about" ? createVirtualElement({
            name: "h1",
            attributes: {},
            children: ["About"]
          }) : createVirtualElement({
            name: "h1",
            attributes: {},
            children: ["Not found"]
          })
        ]
      })
    ]
  })
});

window.addEventListener("popstate", () => {
  window.dispatchEvent(new CustomEvent("route"));
});

window.addEventListener("route", () => {
  dispatch({
    type: "ROUTE_CHANGED",
    payload: window.location.pathname
  });
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
```

## Todo

- [X] Virtual DOM creation algorithm
- [X] DOM diffing
- [X] DOM patching
- [X] Global TEA-like state
- [ ] Keying of lists
- [ ] Explicit runtime errors
- [ ] Hosted examples
- [ ] Unit tests
- [ ] Add a load handler when creating a virtual element
- [ ] Add an unload handler when creating a virtual element

## License

See [License](./LICENSE).
