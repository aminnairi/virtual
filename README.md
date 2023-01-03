# virtual

Virtual DOM based JavaScript library for building dynamic websites.

[Demo Template](https://replit.com/@amin_nairi/virtual-template)

## 1 Disclaimer

This is just an exploration of mine, this wont be a big thing. This library is still at its early stage so use it at your own risks. See [Todo](#8-todo) for a list of things to come.

## 2 Reasons to use

- Lightweight
- Source-code open and readable for humans.
- No JSX and thus can be used with a CDN anywhere.
- You like functional programming.
- Not that much stars or users so you can say "I was there" one day.
- TEA architecture for handling states and updates.
- Best user experience when used with RxJS, Loadash, Ramda, Underscore, ...
- Best user experience when used with TailwindCSS.
- GPLv3 licence

## 3 Reasons not to use

- Too light and you need 85 Ko+ libraries only.
- Source-code readable , no 1-character variables so it looks like it is missing a lot of complicated things.
- No JSX and thus can be hard to maintain large websites.
- Not enough stars, because not so many users.
- Not so many users, because not so many stars.
- You don't like functional programming, RxJS, Lodash, Ramda, Underscore or TailwindCSS.
- You don't like participating in open-source

## 4 Usage

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="This is my application">
    <meta name="theme-color" content="#ffffff">
    <title>Application</title>
  </head>
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

#### 5.1.8 Create an SVG element with children

```javascript
createVirtualElement({
  name: "svg",
  attributes: {
    xmlns: "http://www.w3.org/2000/svg",
    width: "300px",
    height: "300px"
  },
  children: [
    createVirtualElement({
      name: "text",
      attributes: {
        xmlns: "http://www.w3.org/2000/svg",
        x: "50px",
        y: "50px",
        fontSize: "20px",
        fill: "red"
      },
      children: ["Hello, SVG!"]
    })
  ]
});
```

#### 5.1.9 Before load

```javascript
createVirtualElement({
  name: "p",
  attributes: {
    onbeforeload: () => console.log("Just before being added to the DOM")
  },
  children: ["This is a paragraph."]
});
```

#### 5.1.10 Before unload

```javascript
createVirtualElement({
  name: "p",
  attributes: {
    onbeforeunload: () => console.log("Just before being removed from the DOM")
  },
  children: ["This is a paragraph."]
});
```

#### 5.1.11 After load

```javascript
createVirtualElement({
  name: "p",
  attributes: {
    onafterload: () => console.log("Just after being added to the DOM")
  },
  children: ["This is a paragraph."]
});
```

#### 5.1.12 After unload

```javascript
createVirtualElement({
  name: "p",
  attributes: {
    onafterunload: () => console.log("Just after being removed from the DOM")
  },
  children: ["This is a paragraph."]
});
```

#### 5.1.13 component

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

#### 5.1.14 Key

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

#### 5.1.15 Rendering list of elements

```javascript
const fruits = ["Banana", "Apple", "Pear"];

createVirtualElement({
  name: "ul",
  attributes: {},
  children: fruits.map((fruitName, fruitIndex) => {
    return createVirtualElement({
      key: fruitIndex,
      name: "li",
      attributes: {},
      children: [fruitName]
    });
  })
});
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
const dispatch = createApplication({
  element: document.getElementById("application"),
  state: {
    datetime: new Date().toString()
  },
  update: (state, {type, payload}) => {
    switch (type) {
      case "DATETIME_CHANGED":
        return {
          ...state,
          datetime: payload
        };

      default:
        return state;
    }
  },
  view: (state) => createVirtualElement({
    name: "p",
    attributes: {},
    children: [state.datetime]
  })
});

const main = () => {
  window.setTimeout(() => {
    dispatch({
      type: "DATETIME_CHANGED",
      payload: new Date().toString()
    });

    main();
  }, 1000);
};

main();
```

## 6 Installation

### 6.1 CDN with ECMAScript Module

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="This is my application">
    <meta name="theme-color" content="#ffffff">
    <title>Application</title>
  </head>
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

### 6.2 CDN without ECMAScript Module

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="This is my application">
    <meta name="theme-color" content="#ffffff">
    <title>Application</title>
  </head>
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
- [X] Global TEA-like architecture
- [X] Add a load handler when creating a virtual element
- [X] Add an unload handler when creating a virtual element
- [X] Keying
- [X] Readonly callback arguments
- [X] SVG support for element with an `xmlns`
- [X] onbeforeload, onbeforeunload, documentation
- [ ] Hosted example
- [ ] Commented source-code
- [ ] Workspaces
- [ ] Asynchronous lifecycle events for animations
- [ ] createVirtualSvgElement
- [ ] Element reference in lifecycle events
- [ ] error when rendering something other than a string or virtualElement
- [ ] events for SVG elements
- [ ] Unit tests
- [ ] Explicit runtime errors
- [ ] NPM library
- [ ] Linter
- [ ] Lunch with Musk when 100k+ stars

## 9 Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## 10 Code of conduct

See [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

## 11 Changelog

See [`CHANGELOG.md`](./CHANGELOG.md).

## 12 License

See [`License`](./LICENSE).
