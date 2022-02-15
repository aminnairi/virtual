# virtual

Virtual DOM based JavaScript library for building dynamic websites.

[Demo Template](https://replit.com/@amin_nairi/virtual-template)

## 1 Disclaimer

This is just an exploration of mine, this wont be a big thing. This library is still at its early stage so use it at your own risks. See [Todo](#7-todo) for a list of things to come.

## 2 Reasons to use

- Only weights 6K unminified, 3K minified, and 1.5K minified + gzipped.
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

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="application"></div>
    <script type="module">
      import {createVirtualElement, createApplication} from "https://cdn.jsdelivr.net/gh/aminnairi/virtual/build/virtual.module.js";

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
    </script>
  </body>
</html>
```

## 5 API

### 5.1 createVirtualElement

#### 5.1.1 Create an element with no attributes nor children

```javascript
createVirtualElement({
  name: "br",
  attributes: {},
  children: []
});
```

Equivalent to

```html
<br>
```

#### 5.1.2 Create an element with attributes

```javascript
createVirtualElement({
  name: "input",
  attributes: {
    id: "email",
    type: "email",
    placeholder: "Ex: john@doe.com"
  },
  children: []
});
```

Equivalent to

```html
<input id="email" type="email" placeholder="Ex: john@doe.com">
```

#### 5.1.3 Create an element with a text node

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

#### 5.1.4 Create an element with an event

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

#### 5.1.5 Create an element with multiple children

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

#### 5.1.6 Create an element with a CSS class

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

#### 5.1.7 Create an input with a label

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

#### 5.1.8 Load

```javascript
createVirtualElement({
  name: "p",
  attributes: {
    onload: () => console.log("Just after being added to the DOM")
  },
  children: ["This is a paragraph."]
});
```

#### 5.1.9 Unload

```javascript
createVirtualElement({
  name: "p",
  attributes: {
    onunload: () => console.log("Just before being removed from the DOM")
  },
  children: ["This is a paragraph."]
});
```

#### 5.1.10 component

```javascript
const home = () => {
  return createVirtualElement({
    name: "h1",
    attributes: {},
    children: ["Home"]
  });
};

const main = () => {
  return createVirtualElement({
    name: "main",
    attributes: {},
    children: [
      home()
    ]
  });
};
```

#### 5.1.11 Key

```javascript
const main = () => {
  const route = window.location.pathname;

  if (route === "/") {
    return createVirtualElement({
      key: "home",
      name: "h1",
      attributes: {
        onload: () => console.log("Home page loaded"),
        onunload: () => console.log("Home page unloaded")
      },
      children: ["Home"]
    });
  }

  if (route === "/about") {
    return createVirtualElement({
      key: "about",
      name: "h1",
      attributes: {
        onload: () => console.log("About page loaded"),
        onunload: () => console.log("About page unloaded")
      },
      children: ["About"]
    });
  }

  return createVirtualElement({
    key: "notfound",
    name: "h1",
    attributes: {
      onload: () => console.log("Not found page loaded"),
      onunload: () => console.log("Not found page unloaded")
    },
    children: ["Not found"]
  });
};
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

#### 5.2.2 Ternary condition

```javascript
createApplication({
  element: document.getElementById("application"),
  state: {},
  update: state => state,
  view: () => createVirtualElement({
    name: "div",
    attributes: {},
    children: [
      window.location.pathname === "/" ? createVirtualElement({
        name: "h1",
        attributes: {},
        children: ["Hello"]
      }) : null;
    ]
  })
});
```

#### 5.2.3 Short-circuit condition

```javascript
createApplication({
  element: document.getElementById("application"),
  state: {},
  update: state => state,
  view: () => createVirtualElement({
    name: "div",
    attributes: {},
    children: [
      window.location.pathname === "/" && createVirtualElement({
        name: "h1",
        attributes: {},
        children: ["Hello"]
      });
    ]
  })
});
```

#### 5.2.4 State

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

#### 5.2.5 Update

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

#### 5.2.6 Side effects

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

### 6.1 Local

```bash
curl -O /path/to/your/project/virtual.js https://github.com/aminnairi/virtual/tree/development/build/virtual.js
```

### 6.2 CDN with ECMAScript Module

```html
<!DOCTYPE html>
<html>
  <body>
    <script type="module">
      import {createVirtualElement, createApplication} from "https://cdn.jsdelivr.net/gh/aminnairi/virtual/build/virtual.js";
    </script>
  </body>
</html>
```

### 6.3 CDN with ECMAScript Module

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="application"></div>
    <script type="module">
      import {createVirtualElement, createApplication} from "https://cdn.jsdelivr.net/gh/aminnairi/virtual/build/virtual.module.js";

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
    </script>
  </body>
</html>
```

### 6.3 CDN without ECMAScript Module

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="application"></div>
    <script src="https://cdn.jsdelivr.net/gh/aminnairi/virtual/build/virtual.browser.js"></script>
    <script>
      const {createVirtualElement, createApplication} = window["@aminnairi/virtual"];

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
    </script>
  </body>
</html>
```

## 7 Code sharing conventions

- The plugin repository should have a name starting with `virtual-name` or `@user/virtual-name` where `user` is your username on a registry and `name` is the name of your project in lower-kebab-case. For instance `@aminnairi/virtual-router`, `@aminnairi/virtual-state-session-storage` or `@aminnairi/virtual-update-local-storage`.
- The plugin should have a licence GPL-3.0 or later.
- The plugin should have a documentation.
- The plugin should be open for issues.
- The plugin should be targeting ECMAScript Modules & Browsers (and optionally Node).

## 8 Todo

- [X] Virtual DOM creation algorithm
- [X] DOM diffing
- [X] DOM patching
- [X] Global TEA-like state
- [X] Add a load handler when creating a virtual element
- [X] Add an unload handler when creating a virtual element
- [X] Keying
- [ ] Explicit runtime errors
- [ ] Hosted examples
- [ ] Unit tests
- [ ] Readonly callback arguments
- [ ] NPM library
- [ ] TypeScript (probably too hard for me but who knows)
- [ ] Lunch with Musk when 100k+ stars

## 9 Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## 10 Code of conduct

See [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

## 11 License

See [`License`](./LICENSE).
