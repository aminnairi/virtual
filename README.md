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

## 8 History

For quite some time I was library & framework hopping, searching for the tool that could suit my needs.

My history started with Vue, which is a framework I love (and still love) because it offers a great user experience for beginners to start. It adds the right amount of abstraction for beginners so that they can be as productive as in other libraries without having to deal with too much stuff.

Then, my need for understanding libraries grew and I started to be wanting more control over my library, so I started using React. At first, I hated it because it was using classes and `this.setState` and all those complicated lifecycle events and my hate was in reality directed towards me because I didn't quite understand those principles like I do today. But the class-based API was not really appealing to me. Then I went back to Vue until React started using hooks. At first, I though this would be a minor change and I was really into functional programming, people have been saying that this is great because it allows for more functional patterns so I started going back to React and I immediately fell in love with the library and never went back to Vue since then.

JSX was a little bit strange to me at first, but when combined with all of the goodies it brings, it was really a breeze to use. Since there are less magic than Vue, I found what I needed, which was a library that helps getting rid of the complicated things and at that time, the complicated things was the DOM manipulation. But I was also starting to love writing vanilla JavaScript and got to understand better the DOM API with its events and such.

But my hunger for knowledge was really starting to howl as I used React, I really wanted to know why this library weighted so much so I started digging around concepts like Virtual DOM (WTF???) and diffing and patching and I was like ooooookay, but why so much weight? And then I stumbled accross Preact, which is a clone of React (in the concept) but with a way (like waaaaaaay) smaller size (3Kb or so). And I was like okay, the guy behind Preact has created a fully working library similar to React, but for 3Kb, this must not be that difficult.

And since then, I started trying to create diffing algorithms for virtual DOMs, trying to find the algorithm that suited my way of thinking, trying to understand how it worked, and here we are. At first, this project was just the DOM diffing and patching. And since I was in love with functional programming, at the time I was also starting to use Elm. I must say, this language is incredible, I never felt so protected around that layer of types and paradigms. But the only thing that kept me from being a full-time Elm developper is the JavaScript interop. Because it used too much advanced concepts for me and I'm not that smart after all.

So I started to be listing my needs: a framework that wasn't involving too much things (like JSX is out of the way because I want this library to be used in a CDN). But I also want the expressiveness and expliciteness of the functional programming and all of its benefits, while still abstracting the hard part, which is the DOM manipulation and these kind of side effects. So I started to build a wrapper around the diffing and patching algorithms that I created and came up with this design.

I don't really care about the popularity of this library. In fact, I don't even want it to be popular. This repository is private for now and I don't even know if it will ever become public one day. For now, it suits my needs well.

And I started to realize that nowadays, some people are arguing and even fighting about what is the best framework and I though this is a dumb fight. There will never be a best framework that can do it all because it would mean that such framework will have so much compromises and that's not even good. There is only a framework that suits your needs, match your way of think, match the goal you are trying to reach, that could be easily read by humans to understand how it worked by using explicit variable names an no cryptic one-letter variable names etc... You must be in complete agreement with the library or framework you are using, or start making your own.


## 9 License

See [License](./LICENSE).
