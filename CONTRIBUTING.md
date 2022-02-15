# Contributing

## 1 Requirements

- Node
- NPM

or

- Docker
- Docker Compose

## 2 Dependencies installation

This will install the necessary dependencies for development listed in the [`package.json`](./package.json) file.

### 2.1 NPM

```bash
npm install
```

### 2.2 Docker Compose

```bash
docker-compose run --rm npm install
```

## 3 Example

This will start a development server at [`localhost:8000`](http://localhost:8000) serving the files from the [`example`](./example) folder.

### 3.1 NPM

```bash
npm start
```

### 3.2 Docker Compose

```bash
docker-compose run --rm --service-ports npm start
```

## 4 Build

This will build the project in the `build` folder for ECMAScript Module ready browser ([`virtual.module.js`](./build/virtual.module.js)) and non-ECMAScript Module ready browsers ([`virtual.browser.js`](./build/virtual.browser.js)).

### 4.1 NPM

```bash
npm run build
```

### 4.2 Docker Compose

```bash
docker-compose run --rm npm run build
```
