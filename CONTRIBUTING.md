# Contributing

## Requirements

- Node
- NPM

or

- Docker
- Docker Compose

## Dependencies installation

This will install the necessary dependencies for development listed in the [`package.json`](./package.json) file.

### NPM

```bash
npm install
```

### Docker Compose

```bash
docker-compose run --rm npm install
```

## Example

This will start a development server at [`localhost:8000`](http://localhost:8000) serving the files from the [`example`](./example) folder.

### NPM

```bash
npm start
```

### Docker Compose

```bash
docker-compose run --rm --service-ports npm start
```

## Build

This will build the project in the `build` folder for ECMAScript Module ready browser ([`virtual.module.js`](./build/virtual.module.js)) and non-ECMAScript Module ready browsers ([`virtual.browser.js`](./build/virtual.browser.js)).

### NPM

```bash
npm run build
```

### Docker Compose

```bash
docker-compose run --rm npm run build
```
