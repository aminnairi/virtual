# virtual

Virtual DOM based JavaScript framework for building dynamic websites.

## 1 Disclaimer

:warning: This is just an exploration of mine, this wont be a big thing. Use it at your own risks. There are still a lot to improve.

## 2 Reasons to use

- Only weights 6 Ko unminified, 3 Ko minified, and 2 Ko minified + gzipped.
- Source-code open and readable for humans.
- No JSX and thus can be used with a CDN anywhere.
- You like functional programming.
- Not that much stars of users so you can say "I was there" one day.
- TEA architecture for handling states and updates.
- Best user experience when used with RxJS, Loadash, Ramda, Underscore, ...
- Best user experience when used with TailwindCSS.

## 3 Reasons not to use

- Too light and you need 85 Ko+ libraries only.
- Source-code readable , no 1-character variables so it looks like it is missing a lot of complicated things.
- No JSX and thus can be hard to maintain large websites.
- Not enough stars, because not so many users.
- Not so many users, because not so many stars.
- You don't like functional programming, RxJS, Lodash, Ramda, Underscore or TailwindCSS.

## 4 Usage

```javascript
import {createVirtualElement, createApplication} from "/path/to/virtual.js";

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

## 5 API

### 5.1 createVirtualElement

#### 5.1.1 Create an element with a text node

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

#### 5.1.2 Create an element with an event

```javascript
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

#### 5.1.3 Create an element with multiple children

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

#### 5.1.4 Create an element with a CSS class

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

#### 5.1.5 Create an input with a label

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

### 5.2 createApplication

#### 5.2.1 Simple application

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

#### 5.2.2 State

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

#### 5.2.3 Update

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

#### 5.2.4 Side effects

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

## 6 Installation

### 6.1 NPM

Comming soon.

### 6.2 Local

#### 6.2.1 Requirements

- Git
- Node
- NPM
- Docker (optional)
- Docker Compose (optional)

#### 6.2.2 Clone

```bash
git clone https://github.com/aminnairi/virtual.git
cd virtual
```

#### 6.2.3 Build

```bash
npm run build
```

or

```bash
docker-compose run --rm npm run build
```

#### 6.2.4 Usage

```bash
cp build/index.js /path/to/your/project/virtual.js
```

## 7 Todo

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

## 8 License

See [License](./LICENSE).
